import { Card } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { Chat, Message } from "@/app/store/types";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { findChatMembersByChatId } from "@/app/store/slices/chatMembers";
import {
  createMessage,
  findContentOfMessagesByChatId,
  findMessagesByChatId,
  findMessagesBySenderId,
  updateContentInMessagesByMessageId,
} from "@/app/store/slices/messages";
import { findMessageFromUsersByChatId } from "@/app/store/slices/messageFromUsers";
import { format } from "date-fns";
import { updateLastMessageInChatByChatId } from "@/app/store/slices/chats";

type Props = {
  currentChat: Chat;
};

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

const ChatInput = ({ currentChat }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.users.loggedInUser);
  const chatsFromStore = useAppSelector((state) => state.chats.chats);
  const contentFromMessages = useAppSelector(
    (state) => state.messages.foundContentOfMessagesByChatId
  );
  const currentChatMessagesWithUsers = useAppSelector(
    (state) => state.messageFromUsers.foundMessageFromUsersByChatId
  );

  const messagesSentByLoggedInUser = useAppSelector(
    (state) => state.messages.foundMessagesBySenderId
  );

  useEffect(() => {
    dispatch(findMessageFromUsersByChatId(currentChat.chatId));
    dispatch(findContentOfMessagesByChatId(currentChat.chatId));
  }, [currentChat.chatId]);

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;
    if (selectionStart !== null) {
      form.setValue("content", value);
    }
  };

  const handleSend = async (values: z.infer<typeof chatMessageSchema>) => {
    console.log(messagesSentByLoggedInUser);
    const newMessage: Message = {
      senderId: loggedInUser.userId,
      senderImage: loggedInUser.image,
      senderName: loggedInUser.username,
      chatId: currentChat.chatId,
      type: "text",
      messageId: uuidv4(),
      message: values.content,
      content: contentFromMessages
        ? [...contentFromMessages, values.content]
        : [values.content],
      timestamp: format(new Date(), "HH:mm"),
    };
    console.log(newMessage);
    dispatch(createMessage(newMessage));
    dispatch(
      updateContentInMessagesByMessageId({
        messageId: newMessage.messageId,
        messageContent: newMessage.message,
      })
    );
    dispatch(
      updateLastMessageInChatByChatId({
        chatId: currentChat.chatId,
        message: newMessage.message,
      })
    );
    dispatch(findChatMembersByChatId(currentChat.chatId));
    dispatch(findMessagesByChatId(currentChat.chatId));
    dispatch(findMessageFromUsersByChatId(currentChat.chatId));
    dispatch(findMessagesBySenderId(loggedInUser.userId));
    console.log("chatsFromStore", chatsFromStore);
    console.log(
      "New Message",
      newMessage,
      "currentChatMessagesWithUsers",
      currentChatMessagesWithUsers,
      "contentFromMessages",
      contentFromMessages
    );
    form.reset();
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          ,
          <form
            onSubmit={form.handleSubmit(handleSend)}
            className="flex gap-2 items-end w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <TextareaAutosize
                        rows={1}
                        maxRows={8}
                        {...field}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await form.handleSubmit(handleSend)();
                          }
                        }}
                        placeholder="Type a message..."
                        className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
