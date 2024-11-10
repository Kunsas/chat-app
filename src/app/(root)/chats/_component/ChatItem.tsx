import { Chat } from "@/app/store/types";
import MoreOptions from "@/components/shared/MoreOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useChat } from "../../../../../hooks/useChat";

type Props = {
  id: string;
  image?: string;
  username: string;
  isGroup: boolean;
  readChat: boolean;
  lastMessageSender?: string;
  lastMessageContent?: string;
  onOptionSelect: React.Dispatch<React.SetStateAction<string>>;
  setChatIdToDelete: React.Dispatch<React.SetStateAction<string>>;
};

const ChatItem = ({
  id,
  image,
  username,
  isGroup,
  readChat,
  lastMessageSender,
  lastMessageContent,
  onOptionSelect,  setChatIdToDelete
}: Props) => {
  
  const [markReadChat, setMarkReadChat] = useState(readChat);
  const [chatIdToRead, setChatIdToRead] = useState<string>("");
  const isActive = useChat();

  useEffect(() => {
    if (chatIdToRead) {
      setMarkReadChat((prev) => !prev);
    }
  }, [chatIdToRead]);


  return (
    <Card className="w-full p-2 flex flex-row justify-between items-center gap-4 truncate">
      <div className="flex flex-row items-center gap-4 truncate">
        <Link
          href={`/chats/${id}`}
          className="flex flex-row items-center gap-4 truncate"
        >
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
            {isGroup ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">
                  {lastMessageSender} {":"}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis">
                  {lastMessageContent}
                </p>
              </span>
            ) : lastMessageContent ? (
              <p className="text-sm text-muted-foreground truncate">
                {lastMessageContent}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground truncate">Draft</p>
            )}
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between items-center">
        <MoreOptions
          chatId={id}
          onOptionSelect={onOptionSelect}
          setChatIdToDelete={setChatIdToDelete}
          setChatIdToRead={setChatIdToRead}
        />
        { !markReadChat || !isActive ? <Badge variant="default"></Badge> : null}
        <p
          className={
            "text-xs flex w-full pt-1 justify-end"
          }
        >
          {format(new Date(), "HH:mm")}
        </p>
      </div>
    </Card>
  );
};

export default ChatItem;
