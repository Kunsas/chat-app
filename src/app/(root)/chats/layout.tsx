"use client";

import { v4 as uuidv4 } from "uuid";
import ItemsList from "@/components/shared/item-list/ItemsList";
import React, { useState } from "react";
import { NewChat } from "./_component/NewChat";
import ChatItem from "./_component/ChatItem";
import { toast } from "sonner";
import { Chat, ChatMember, Friend, Message, User } from "@/app/store/types";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { createChat, deleteChat, findChatById } from "@/app/store/slices/chats";
import { addFriend, deleteFriendsByChatId } from "@/app/store/slices/friends";
import {
  createMessage,
  deleteMessagesByChatId,
} from "@/app/store/slices/messages";
import {
  addChatMembers,
  deleteChatMembersByChatId,
} from "@/app/store/slices/chatMembers";
import MoreOptions from "@/components/shared/MoreOptions";
type Props = React.PropsWithChildren<{}>;

const ChatsLayout = ({ children }: Props) => {
  const [newParticipant, setNewParticipant] = useState<User | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const currentChats = useAppSelector((state) => state.chats.chats);
  const loggedInUser = useAppSelector((state) => state.users.loggedInUser);
  const [chatIdToDelete, setChatIdToDelete] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleNewChat = (selectedUser: User) => {
    const directChats = currentChats.some((chat) => {
      const isDirectChat = !chat.isGroup;
      const isSameUser = chat.name === selectedUser.username;
      console.log("Checking direct chat:", { chat, isDirectChat, isSameUser });
      return isDirectChat && isSameUser;
    });
    console.log("Duplicate", directChats);
    console.log(currentChats);
    if (directChats) {
      console.log("inside point");
      toast.error("Chat with selected participant already exists");
    } else {
      const placeholderMessage: Message = {
        senderId: selectedUser.userId,
        chatId: uuidv4(),
        type: "string",
        content: [
          "heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        ],
      };
      const newChat: Chat = {
        chatId: placeholderMessage.chatId,
        isGroup: false,
        name: selectedUser.username,
        image: selectedUser.image,
        lastMessage:
          placeholderMessage.content[placeholderMessage.content.length - 1],
      };
      const newFriend: Friend = {
        sender: selectedUser,
        receiver: loggedInUser,
        chatId: placeholderMessage.chatId,
      };
      const loggedInUserAsChatMember: ChatMember = {
        memberId: loggedInUser.userId,
        chatId: newChat.chatId,
        lastSeenMessage:
          placeholderMessage.content[placeholderMessage.content.length - 1],
      };
      const newParticipantAsChatMember: ChatMember = {
        memberId: selectedUser.userId,
        chatId: newChat.chatId,
        lastSeenMessage:
          placeholderMessage.content[placeholderMessage.content.length - 1],
      };
      dispatch(createMessage(placeholderMessage));
      dispatch(createChat(newChat));
      dispatch(addFriend(newFriend));
      dispatch(addChatMembers(loggedInUserAsChatMember));
      dispatch(addChatMembers(newParticipantAsChatMember));
      toast.success(`Chat with ${selectedUser.username} created!`);
      setNewParticipant(null);
    }
  };

  const handleDeleteChat = (chatIdSelected: string) => {
    dispatch(deleteMessagesByChatId(chatIdSelected));
    dispatch(deleteChat(chatIdSelected));
    dispatch(deleteFriendsByChatId(chatIdSelected));
    dispatch(deleteChatMembersByChatId(chatIdSelected));
    toast.success("Chat deleted successfully!");
  };

  React.useEffect(() => {
    if (newParticipant) {
      handleNewChat(newParticipant);
      setNewParticipant(null);
    }
    if (chatIdToDelete && selectedOption === "Delete") {
      handleDeleteChat(chatIdToDelete);
      setSelectedOption("");
      setChatIdToDelete("");
    }
  }, [newParticipant, chatIdToDelete, selectedOption]);

  return (
    <>
      <ItemsList
        title="Chats"
        action={<NewChat onNewChat={setNewParticipant} />}
      >
        {currentChats.length === 0 ? (
          <p className="w-full h-full flex items-center justify-center">
            Start chat with a new participant !
          </p>
        ) : (
          currentChats.map((chat) => {
            return chat.isGroup ? (
              <ChatItem
                key={chat.chatId}
                id={chat.chatId}
                username={chat.name || ""}
                image={chat.image}
                lastMessageContent={chat.lastMessage}
                onOptionSelect={setSelectedOption}
                setChatIdToDelete={setChatIdToDelete}
              />
            ) : (
              <ChatItem
                key={chat.chatId}
                id={chat.chatId}
                username={chat.name || ""}
                image={chat.image}
                lastMessageContent={chat.lastMessage}
                onOptionSelect={setSelectedOption}
                setChatIdToDelete={setChatIdToDelete}
              />
            );
          })
        )}
      </ItemsList>
      {children}
    </>
  );
};

export default ChatsLayout;
