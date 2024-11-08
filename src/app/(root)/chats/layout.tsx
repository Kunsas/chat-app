"use client";

import { v4 as uuidv4 } from "uuid";
import ItemsList from "@/components/shared/item-list/ItemsList";
import React, { useState, useEffect } from "react";
import { NewChat } from "./_component/NewChat";
import { loggedInUser, User } from "@/app/data/users";
import { addChat, Chat, chats } from "@/app/data/chats";
import ChatItem from "./_component/ChatItem";
import { toast } from "sonner";
type Props = React.PropsWithChildren<{}>;

const ChatsLayout = ({ children }: Props) => {
  const [currentChats, setCurrentChats] = useState<Chat[]>(chats);
  const [newParticipant, setNewParticipant] = useState<User | null>(null);

  const handleNewChat = (selectedUser: User) => {
    const directChats = chats
      .filter((chat) => !chat.isGroup)
      .some((directChat) => {
        console.log(directChat, selectedUser);
        console.log(directChat.name === selectedUser.username);
        return directChat.name === selectedUser.username;
      });
    console.log("Duplicate", directChats);
    if (directChats) {
      console.log("inside point");
      toast.error("Chat with selected participant already exists");
      // toast.error("Chat with selected participant already exists.");
    } else {
      const newChat: Chat = {
        id: (currentChats.length + 1).toString(),
        isGroup: false,
        name: selectedUser.username,
        image: selectedUser.image,
        participants: [loggedInUser, selectedUser],
        lastSentMessage: "Sample last message",
      };
      addChat(newChat, chats);
      toast.success(`Chat with ${selectedUser.username} created!`);
      setNewParticipant(null);
    }
    console.log(currentChats);
  };

  React.useEffect(() => {
    if (newParticipant) {
      handleNewChat(newParticipant);
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
            return chat.isGroup ? (
              <ChatItem
                key={chat.id}
                id={chat.id}
                username={chat.name || ""}
                image={chat.image}
                lastMessageContent={chat.lastSentMessage}
                lastMessageSender={loggedInUser.username}
                // lastMessageSender={chat.lastSentMessageId?.sender}
              />
            ) : (
              <ChatItem
                key={chat.id}
                id={chat.id}
                username={chat.name || ""}
                image={chat.image}
                lastMessageContent={chat.lastSentMessage}
                lastMessageSender={loggedInUser.username}
                // lastMessageSender={chat.lastSentMessageId?.sender}
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
