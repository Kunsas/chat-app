"use client";

import {
  MessageDetailsResponse,
  UserDetailsResponse,
} from "@/app/api/models/apiRequests";
import MessageTile from "./MessageTile";

import { format } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
  messagesInCurrentChat: MessageDetailsResponse[];
};

const Body = ({ messagesInCurrentChat }: Props) => {
  const [user, setUser] = useState<UserDetailsResponse>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.userDetails) {
          setUser(data.userDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(messagesInCurrentChat);
  return (
    <div className="w-full flex flex-1 overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messagesInCurrentChat && messagesInCurrentChat.length > 0 ? (
        messagesInCurrentChat.map((message) => {
          if (user) {
            return (
              <MessageTile
                key={message._id}
                fromCurrentLoggedInUser={message.senderName === user.username}
                senderImage={message.senderImage}
                senderName={message.senderName}
                lastByUser={message.senderName === user.username}
                content={message.content}
                createdAt={format(message.createdAt, "HH:mm")}
                type={message.type}
              />
            );
          } else {
            <MessageTile
              key={message._id}
              senderImage={message.senderImage}
              senderName={message.senderName}
              content={message.content}
              createdAt={format(message.createdAt, "HH:mm")}
              type={message.type}
            />;
          }
        })
      ) : (
        <span className="flex justify-center items-center w-full h-full text-muted-foreground">
          Start a conversation
        </span>
      )}
    </div>
  );
};

export default Body;
