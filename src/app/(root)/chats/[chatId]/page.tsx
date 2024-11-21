"use client";

import WrapperContainer from "@/components/shared/WrapperContainer";
import Chat from "@/lib/mongodb/models/chat";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Body from "./_components/Body";
import ChatInput from "./_components/ChatInput";
import Header from "./_components/Header";

import dbConnect from "@/lib/mongodb/db";
import Message from "@/lib/mongodb/models/message";
import { ObjectId } from "mongodb";
import { useChat } from "../../../../../hooks/useChat";

interface ChatDetails {
  _id: string;
  chatName: string;
  chatImageUrl: string;
}

interface MessageDetails {
  _id: string;
  senderImage: string;
  senderName: string;
  content: string;
  createdAt: Date;
  type: string;
}

const ChatPage = () => {
  const [chatDetails, setChatDetails] = useState<ChatDetails>();
  const [messages, setMessages] = useState<MessageDetails[]>([]);
  const { chatId } = useChat();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("chatId:", chatId); // Ensure chatId is correct
        console.log("Fetching data from:", `/api/chats/${chatId}`);

        const res = await fetch(`/api/chats/${chatId}`);
        console.log(res);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data);
        if (data.chatDetails) {
          setChatDetails(data.chatDetails);
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
        name={chatDetails.chatName || ""}
        image={chatDetails.chatImageUrl}
      />
      <Body messagesInCurrentChat={messages} />{" "}
      <ChatInput messagesInCurrentChat={messages} />
    </WrapperContainer>
  );
};

export default ChatPage;
