"use client";

import WrapperContainer from "@/components/shared/WrapperContainer";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import Body from "./_components/Body";
import ChatInput from "./_components/ChatInput";
import { useParams } from "next/navigation";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useChat } from "../../../../../hooks/useChat";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { findChatById } from "@/app/store/slices/chats";

const ChatPage = () => {
  const chatId = useChat().chatId;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(findChatById(chatId));
  }, [chatId]);

  const currentChat = useAppSelector((state) => state.chats.foundChatByChatId);

  return currentChat === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : currentChat === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <WrapperContainer>
      <Header name={currentChat.name || ""} image={currentChat.image} />
      <Body currentChat={currentChat} /> <ChatInput currentChat={currentChat} />
    </WrapperContainer>
  );
};

export default ChatPage;
