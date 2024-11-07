import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  image: string;
  username: string;
};

const ChatItem = ({ id, image, username }: Props) => {
  return (
    <Link href={`/chats/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>
            <UserRound />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          <p className="text-sm text-muted-foreground truncate">Draft</p>
        </div>
      </Card>
    </Link>
  );
};

export default ChatItem;
