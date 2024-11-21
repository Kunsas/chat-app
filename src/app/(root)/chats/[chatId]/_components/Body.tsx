"use client";

import MessageTile from "./MessageTile";

import { format } from "date-fns";

interface MessageDetails {
  _id: string;
  senderImage: string;
  senderName: string;
  content: string;
  createdAt: Date;
  type: string;
}

type Props = {
  messagesInCurrentChat: MessageDetails[];
};

const Body = ({ messagesInCurrentChat }: Props) => {
  console.log(messagesInCurrentChat);
  return (
    <div className="w-full flex flex-1 overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messagesInCurrentChat && messagesInCurrentChat.length > 0 ? (
        messagesInCurrentChat.map((message) => (
          <MessageTile
            key={message._id}
            // fromCurrentLoggedInUser={
            //   message.message.senderId === loggedInUser.userId
            // }
            fromCurrentLoggedInUser={false}
            senderImage={message.senderImage}
            senderName={message.senderName}
            // lastByUser={message.message.senderId === loggedInUser.userId}
            lastByUser={false}
            content={message.content}
            createdAt={format(message.createdAt, "HH:mm")}
            type={message.type}
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
