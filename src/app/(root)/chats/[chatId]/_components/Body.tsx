"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "../../../../../../hooks/useChat";
import { Message as M, MessageWithUser } from "@/app/data/messages";
import Message from "./Message";
import { loggedInUser, users } from "@/app/data/users";

type Props = {};

const Body = (props: Props) => {
  const { chatId } = useChat();

  const [messageWithUser, setMessageWithUser] = useState<MessageWithUser[]>([]);

  useEffect(() => {
    const initializeMessagesWithUser = async () => {
      const messages = [
        {
          id: "1",
          senderId: loggedInUser.id,
          type: "text",
          creationTime: Date.now(),
          chatId: "2",
          messageType: "text",
          content: ["hi"],
        },
      ];

      const getUserData = (senderId: string) => {
          return users[parseInt(senderId)];
      };

      const messagesWithUser = messages.map((message) => {
        const user = getUserData(message.senderId)
        const isCurrentUser = message.senderId === loggedInUser.id;

        return {
          message,
          senderImage: user.image,
          senderName: user.username,
          isCurrentUser,
        };
      });

      setMessageWithUser(messagesWithUser);
    };

    initializeMessagesWithUser();
  }, []);

  return (
    <div className="w-full flex flex-1 overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messageWithUser?.map(
        ({ message, senderImage, senderName, isCurrentUser }, index) => {
          const lastByUser =
            messageWithUser[index - 1]?.message.senderId ===
            messageWithUser[index]?.message.senderId;
          return (
            <Message
              key={message.id}
              fromCurrentLoggedInUser={isCurrentUser}
              senderImage={senderImage}
              senderName={senderName}
              lastByUser={lastByUser}
              content={message.content}
              createdAt={message.creationTime}
              type={message.type}
            />
          );
        }
      )}
    </div>
  );
};

export default Body;
