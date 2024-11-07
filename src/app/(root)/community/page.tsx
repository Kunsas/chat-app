import ContainerFallback from "@/components/shared/ContainerFallback";
import ItemsList from "@/components/shared/item-list/ItemsList";
import React from "react";
import { User, users } from "@/app/data/users";

type Props = {};

const CommunityPage = (props: Props) => {
  const participants: User[] = users;
  return (
    <>
      <ItemsList title="Community">
        {participants ? null : "Community Page"}
      </ItemsList>
      <ContainerFallback />
    </>
  );
};

export default CommunityPage;
