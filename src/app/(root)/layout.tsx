"use client";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

type Props = React.PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <Wrapper>{children}</Wrapper>
    </Provider>
  );
};

export default Layout;
