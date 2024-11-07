import ContainerFallback from "@/components/shared/ContainerFallback";
import ItemsList from "@/components/shared/item-list/ItemsList";
import React from "react";
import AddParticipant from "./_component/AddParticipant";
import { users } from "@/app/data/users";
import { User } from "@/app/data/model/user";

type Props = {};

const CommunityPage = (props: Props) => {
  const participants : User[] = users
  return (
    <>
      <ItemsList title="Community" action={<AddParticipant />}>
        {participants ? null : "Community Page"}
      </ItemsList>
      <ContainerFallback />
    </>
  );
};

export default CommunityPage;
