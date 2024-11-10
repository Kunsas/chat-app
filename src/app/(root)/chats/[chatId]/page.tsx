"use client";

import { chats } from "@/app/data/chats";
import WrapperContainer from "@/components/shared/WrapperContainer";
import { Loader2 } from "lucide-react";
import React from "react";
import Header from "./_components/Header";
import Body from "./_components/Body";
import ChatInput from "./_components/ChatInput";
import { useParams } from "next/navigation";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

const ChatPage = () => {
  const params = useParams();
  const chatId = params.chatId as string;

  const currentChat = useAppSelector((state) =>
    state.chats.chats.find((chat) => chat.chatId === chatId)
  );
  console.log(chatId)
  console.log(currentChat);

  return currentChat === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : currentChat === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <WrapperContainer>
      <Header name={currentChat.name || ""} image={currentChat.image} />
      <Body /> <ChatInput />
    </WrapperContainer>
  );
};

export default ChatPage;
