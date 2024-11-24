"use client";

import ItemsList from "@/components/shared/item-list/ItemsList";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ChatItem from "./_component/ChatItem";
import { ChatDetailsResponse } from "@/app/api/models/apiRequests";
type Props = React.PropsWithChildren<{}>;

const ChatsLayout = ({ children }: Props) => {
  const [chats, setChats] = useState<ChatDetailsResponse[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/chats/`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.chats) {
          setChats(data.chats);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!chats)
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
        {chats.length === 0 ? (
          <p className="w-full h-full flex items-center justify-center">
            Start chat with a new participant !
          </p>
        ) : (
          chats.map((chat: any) => {
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
