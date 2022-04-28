import React from "react";
import BrandButton from "ui/BrandButton";
import Navbar from "ui/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar>
        <BrandButton size="lg">Connect</BrandButton>
      </Navbar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
