"use client";

import { v4 as uuidv4 } from "uuid";
import ItemsList from "@/components/shared/item-list/ItemsList";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { NewChat } from "./_component/NewChat";
import { loggedInUser, User } from "@/app/data/users";
import { Chat, chats as initialChats } from "@/app/data/chats";
import ChatItem from "./_component/ChatItem";

type Props = React.PropsWithChildren<{}>;

const ChatsLayout = ({ children }: Props) => {
  const [currentChats, setCurrentChats] = useState<Chat[]>([]);
  const [newParticipant, setNewParticipant] = useState<User | null>(null);

  useEffect(() => {
    if (newParticipant) {
      const newChat: Chat = {
        id: uuidv4(),
        isGroup: false,
        participants: [loggedInUser, newParticipant],
      };

      setCurrentChats((prevChats) => [...prevChats, newChat]);

      setNewParticipant(null);
    }
  }, [newParticipant]);

  return (
    <>
      <ItemsList
        title="Chats"
        action={<NewChat onNewChat={setNewParticipant} />}
      >
        {currentChats.length === 0 ? (
          <p className="w-full h-full flex items-center justify-center">
            No chats found
          </p>
        ) : (
          currentChats.map((chat) => {
            return chat.isGroup ? null : (
              <ChatItem
                key={chat.id}
                id={chat.id}
                username={chat.participants[1]?.username}
                image={chat.participants[1]?.image}
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
