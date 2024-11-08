import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  image: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
};

const ChatItem = ({
  id,
  image,
  username,
  lastMessageSender,
  lastMessageContent,
}: Props) => {
  return (
    <Link href={`/chats/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
        <Avatar>
          <AvatarImage
            src={image === "group" ? username.substring(0, 1) : "/" + image}
            alt={username.substring(0, 1)}
            className="rounded-full"
          />
          <AvatarFallback>{username.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          {/* { lastMessageContent && lastMessageSender ? ( */}
          { lastMessageContent || lastMessageSender ? (
            <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
              <p className="font-semibold">
                {lastMessageSender} {":"}&nbsp;
              </p>
              <p className="truncate overflow-ellipsis">{lastMessageContent}</p>
            </span>
          ) : (
            <p className="text-sm text-muted-foreground truncate">Draft</p>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ChatItem;
