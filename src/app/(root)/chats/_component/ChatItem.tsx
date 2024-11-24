import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  id: string;
  image?: string;
  chatName: string;
  isGroup: boolean;
  lastMessageContent?: string;
  lastMessageSender: string;
  lastSentTime: string;
};

const ChatItem = ({
  id,
  image,
  chatName,
  isGroup,
  lastMessageContent,
  lastMessageSender,
  lastSentTime,
}: Props) => {
  return (
    <Card className="w-full p-2 flex flex-row justify-between items-center gap-4 truncate">
      <div className="flex flex-row items-center gap-4 truncate">
        <Link
          href={`/chats/${id}`}
          className="flex flex-row items-center gap-4 truncate"
        >
          <Avatar>
            <AvatarImage
              src={image === "group" ? chatName.substring(0, 1) : "/" + image}
              alt={chatName.substring(0, 1)}
              className="rounded-full"
            />
            <AvatarFallback>{chatName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{chatName}</h4>
            {isGroup ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">
                  {lastMessageSender} {":"}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis">
                  {lastMessageContent}
                </p>
              </span>
            ) : lastMessageContent ? (
              <p className="text-sm text-muted-foreground truncate">
                {lastMessageContent}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground truncate">Draft</p>
            )}
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between items-center">
        {/* More Options */}
        <p className={"text-xs flex w-full pt-1 justify-end"}>
          {format(lastSentTime, "HH:mm")}
        </p>
      </div>
    </Card>
  );
};

export default ChatItem;
