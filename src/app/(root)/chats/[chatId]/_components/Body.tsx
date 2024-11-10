"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import MessageTile from "./MessageTile";

import { Chat, Message } from "@/app/store/types";
import ContainerFallback from "@/components/shared/ContainerFallback";
import { findMessageFromUsersByChatId } from "@/app/store/slices/messageFromUsers";

type Props = {
  currentChat: Chat;
};

const Body = ({ currentChat }: Props) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.users.loggedInUser);
  const messagesInCurrentChat = useAppSelector(
    (state) => state.messageFromUsers.foundMessageFromUsersByChatId
  );

  console.log(messagesInCurrentChat);

  useEffect(() => {
    dispatch(findMessageFromUsersByChatId(currentChat.chatId));
  }, [currentChat.chatId]);

  return (
    <div className="w-full flex flex-1 overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messagesInCurrentChat && messagesInCurrentChat.length > 0 ? (
        messagesInCurrentChat.map((message) => (
          <MessageTile
            key={message.message.messageId}
            fromCurrentLoggedInUser={
              message.message.senderId === loggedInUser.userId
            }
            senderImage={message.message.senderImage}
            senderName={message.message.senderName}
            lastByUser={message.message.senderId === loggedInUser.userId}
            content={message.message.message}
            createdAt={message.message.timestamp}
            type={message.message.type}
          />
        ))
      ) : (
        <span className="flex justify-center items-center w-full h-full text-muted-foreground">
          Start a conversation
        </span>
      )}
    </div>
  );
};

export default Body;
