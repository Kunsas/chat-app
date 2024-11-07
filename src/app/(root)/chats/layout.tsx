import ItemsList from "@/components/shared/item-list/ItemsList";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const ChatsLayout = ({ children }: Props) => {
  return (
    <>
      <ItemsList title="Chats">Chats Page</ItemsList>
      {children}
    </>
  );
};

export default ChatsLayout;
