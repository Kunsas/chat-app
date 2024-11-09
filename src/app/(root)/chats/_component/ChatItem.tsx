import { Chat } from "@/app/store/types";
import MoreOptions from "@/components/shared/MoreOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  image?: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  onOptionSelect: React.Dispatch<React.SetStateAction<string>>;
  setChatIdToDelete: React.Dispatch<React.SetStateAction<string>>; 
};

const ChatItem = ({
  id,
  image,
  username,
  lastMessageSender,
  lastMessageContent,
  onOptionSelect,
  setChatIdToDelete,
}: Props) => {
  return (
    <Card className="w-full p-2 flex flex-row justify-between items-center gap-4 truncate">
      <div className="flex flex-row items-center gap-4 truncate">
        <Link href={`/chats/${id}`} className="flex flex-row items-center gap-4 truncate">
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
            {lastMessageContent || lastMessageSender ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">
                  {lastMessageSender} {":"}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis">
                  {lastMessageContent}
                </p>
              </span>
            ) : (
              <p className="text-sm text-muted-foreground truncate">Draft</p>
            )}
          </div>
        </Link>
      </div>
      <MoreOptions chatId={id} onDeleteChatSelected={onOptionSelect} setChatIdToDelete={setChatIdToDelete}/>
    </Card>
  );
};

export default ChatItem;
