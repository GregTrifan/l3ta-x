import { Button, SharedButtonProps } from "@mantine/core";
type PropTypes = SharedButtonProps & {
  children: React.ReactNode;
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
