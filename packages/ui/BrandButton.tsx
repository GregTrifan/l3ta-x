import { Button, SharedButtonProps } from "@mantine/core";
import { MouseEventHandler } from "react";
type PropTypes = SharedButtonProps & {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
const BrandButton = (props: PropTypes) => {
  return (
    <Button
      variant="gradient"
      radius="xl"
      gradient={{ from: "teal", to: "lime", deg: 105 }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
export default BrandButton;
