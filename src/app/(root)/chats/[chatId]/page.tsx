"use client";

import WrapperContainer from "@/components/shared/WrapperContainer";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Body from "./_components/Body";
import ChatInput from "./_components/ChatInput";
import Header from "./_components/Header";

import { useChat } from "../../../../../hooks/useChat";
import {
  ChatDetailsResponse,
  MessageDetailsResponse,
} from "@/app/api/models/apiRequests";

const ChatPage = () => {
  const [chatDetails, setChatDetails] = useState<ChatDetailsResponse>();
  const [messages, setMessages] = useState<MessageDetailsResponse[]>([]);
  const { chatId } = useChat();

  console.log(chatDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/chats/${chatId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.chatDetails) {
          setChatDetails(data.chatDetails[0]);
        }
        if (data.messages) {
          setMessages(data.messages);
        } else {
          console.error("No messages found in the response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [chatId]);

  return chatDetails === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : chatDetails === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <WrapperContainer>
      <Header
        name={chatDetails.chatName || "No username"}
        image={chatDetails.chatImageUrl}
      />
      <Body messagesInCurrentChat={messages} />{" "}
      <ChatInput messagesInCurrentChat={messages} />
    </WrapperContainer>
  );
};

export default ChatPage;
