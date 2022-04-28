import React from "react";
import { Box } from "@mantine/core";
import { styled } from "@stitches/react";
const Navbar = ({ children }: { children: React.ReactNode }) => {
  const Header = styled("h1", {
    fontWeight: 400,
    "&:hover": {
      fontWeight: 700,
      color: "#2d2d2d",
      transition: "ease-in",
      transitionDuration: 1,
    },
  });
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        padding: theme.spacing.xs,
        display: "flex",
        justifyContent: "space-between",
        borderRadius: theme.radius.md,
      })}
    >
      <Header>L3TA-X</Header>
      <Box sx={{ marginTop: "auto", marginBottom: "auto" }}>{children}</Box>
    </Box>
  );
};

export default Navbar;
