"use client";

import ItemsList from "@/components/shared/item-list/ItemsList";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import useSWR from "swr";
import ChatItem from "./_component/ChatItem";
type Props = React.PropsWithChildren<{}>;

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const ChatsLayout = ({ children }: Props) => {
  const { data } = useSWR(`/api/chats/`, fetcher);

  if (!data)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <>
      <ItemsList
        title="Chats"
        // action={<NewChat onNewChat={setNewParticipant} />}
      >
        {data === 0 ? (
          <p className="w-full h-full flex items-center justify-center">
            Start chat with a new participant !
          </p>
        ) : (
          data.chats.map((chat: any) => {
            console.log(chat);
            return chat.isGroup ? (
              <ChatItem
                key={chat._id}
                id={chat._id}
                chatName={chat.chatName}
                image={chat.chatImage}
                isGroup={chat.isGroup}
                lastMessageSender={chat.lastMessageSenderName}
                lastMessageContent={chat.lastMessageContent}
                lastSentTime={chat.lastSentTime}
              />
            ) : (
              <ChatItem
                key={chat._id}
                id={chat._id}
                chatName={chat.chatName}
                image={chat.chatImage}
                isGroup={chat.isGroup}
                lastMessageSender={chat.lastMessageSenderName}
                lastMessageContent={chat.lastMessageContent}
                lastSentTime={chat.lastSentTime}
              />
            );
          })
        )}
      </ItemsList>
      {children}
    </>
  );
};

export default ChatsLayout;
