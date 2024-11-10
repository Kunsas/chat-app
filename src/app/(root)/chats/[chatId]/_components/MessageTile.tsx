import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

type Props = {
  fromCurrentLoggedInUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content?: string;
  createdAt: string;
  type: string;
};

const MessageTile = ({
  fromCurrentLoggedInUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  type,
}: Props) => {
  return (
    <div
      className={cn("flex items-end", {
        "justify-end": fromCurrentLoggedInUser,
      })}
    >
      <div
        className={cn("flex flex-col w-full mx-2", {
          "order-1 items-end": fromCurrentLoggedInUser,
          "order-2 items-start": !fromCurrentLoggedInUser,
        })}
      >
        <div
          className={cn("px-4 py-2 rounded-lg max-w-[70%]", {
            "bg-primary text-primary-foreground": fromCurrentLoggedInUser,
            "bg-secondary text-secondary-foreground": !fromCurrentLoggedInUser,
            "rounded-br-none": !lastByUser && fromCurrentLoggedInUser,
            "rounded-bl-none": !lastByUser && !fromCurrentLoggedInUser,
          })}
        >
          {type === "text" ? (
            <p className="text-wrap break-words whitespace-prepwrap">
              {content}
            </p>
          ) : null}
          <p
            className={cn("text-xs flex w-full my-1", {
              "text-primary-foreground justify-end": fromCurrentLoggedInUser,
              "text-secondary-foreground justify-start":
                !fromCurrentLoggedInUser,
            })}
          >
            {createdAt}
          </p>
        </div>
      </div>

      <Avatar
        className={cn("relative w-8 h-8", {
          "order-2": fromCurrentLoggedInUser,
          "order-1": !fromCurrentLoggedInUser,
          // invisible: lastByUser,
        })}
      >
        <AvatarImage src={"/" + senderImage} />
        <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default MessageTile;
