"use client";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
