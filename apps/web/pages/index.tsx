import BrandButton from "ui/BrandButton";
import { styled } from "@stitches/react";

export default function Home() {
  const Header = styled("h1", {
    fontWeight: 400,
    textAlign: "center",
    "&:hover": {
      fontWeight: 500,
      color: "#141414",
    },
  });
  return (
    <div>
      <Header>Home</Header>
    </div>
  );
}
