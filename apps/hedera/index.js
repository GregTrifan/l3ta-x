const {
  Client,
  PrivateKey,
  ContractCreateTransaction,
  FileCreateTransaction,
  ContractFunctionParameters,
  ContractDeleteTransaction,
  ContractCallQuery,
  Hbar,
  ContractExecuteTransaction,
  AccountId,
} = require("@hashgraph/sdk");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// Import the compiled contract
const letaX = fs.readFileSync("dist/contracts_LetaX_sol_LetaX.bin");

async function main() {
  let client;

  try {
    client = Client.forName(process.env.HEDERA_NETWORK).setOperator(
      AccountId.fromString(process.env.ACCOUNT_ID),
      PrivateKey.fromString(process.env.PRIVATE_KEY)
    );
  } catch (error) {
    throw new Error(
      "Environment variables HEDERA_NETWORK, ACCOUNT_ID, and PRIVATE_KEY are required."
    );
  }

  const contractByteCode = letaX;

  // Create a file on Hedera which contains the contact bytecode.
  // Note: The contract bytecode **must** be hex encoded, it should not
  // be the actual data the hex represents
  const fileTransactionResponse = await new FileCreateTransaction()
    .setKeys([client.operatorPublicKey])
    .setContents(contractByteCode)
    .execute(client);

  // Fetch the receipt for transaction that created the file
  const fileReceipt = await fileTransactionResponse.getReceipt(client);

  // The file ID is located on the transaction receipt
  const fileId = fileReceipt.fileId;

  console.log(`contract bytecode file: ${fileId.toString()}`);

  // Create the contract
  const contractTransactionResponse = await new ContractCreateTransaction()
    // Set gas to create the contract
    .setGas(100000)
    // The contract bytecode must be set to the file ID containing the contract bytecode
    .setBytecodeFileId(fileId)
    .setConstructorParameters(
      new ContractFunctionParameters().addString("L3taX")
    )
    // Set the admin key on the contract in case the contract should be deleted or
    // updated in the future
    .setAdminKey(client.operatorPublicKey)

    .execute(client);

  // Fetch the receipt for the transaction that created the contract
  const contractReceipt = await contractTransactionResponse.getReceipt(client);

  // The conract ID is located on the transaction receipt
  const contractId = contractReceipt.contractId;

  console.log(`new contract ID: ${contractId.toString()}`);

  // Call a method on a contract
  // Note: `ContractCallQuery` cannot mutate a contract, it will only return the last state
  // of the contract
  const contractCallResult = await new ContractCallQuery()
    .setContractId(contractId)
    .setGas(75000)
    .setFunction("getMessage")
    .setQueryPayment(new Hbar(1))
    .execute(client);

  if (
    contractCallResult.errorMessage != null &&
    contractCallResult.errorMessage != ""
  ) {
    console.log(`error calling contract: ${contractCallResult.errorMessage}`);
  }

  // Get the message from the result
  // The `0` is the index to fetch a particular type from
  //
  // e.g.
  // If the return type of `get_message` was `(string[], uint32, string)`
  // then you'd need to get each field separately using:
  //      const stringArray = contractCallResult.getStringArray(0);
  //      const uint32 = contractCallResult.getUint32(1);
  //      const string = contractCallResult.getString(2);
  const message = contractCallResult.getString(0);
  console.log(`contract message: ${message}`);
}

void main();
