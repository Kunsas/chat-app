import mongoDBClient, { getDBConnection } from "@/lib/mongodb/db";
import Chat from "@/lib/mongodb/models/chat";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const dbConnection = await getDBConnection();
    if (dbConnection) {
      const chats = await dbConnection
        .collection("chats")
        .aggregate([
          {
            // Lookup to get all messages related to the chat
            $lookup: {
              from: "messages",
              localField: "lastMessageId",
              foreignField: "_id",
              as: "lastMessage",
            },
          },
          {
            $unwind: {
              path: "$lastMessage",
              preserveNullAndEmptyArrays: true, // Keep documents even if no last message exists
            },
          },
          {
            // Group by chat `_id` to get the latest message for each chat
            $group: {
              _id: "$_id",
              chatImage: { $first: "$chatImageUrl" },
              chatName: { $first: "$name" },
              isGroup: { $first: "$isGroup" },
              lastMessage: { $first: "$lastMessage" },
            },
          },
          {
            // Perform $lookup to get the sender's details for group chats
            $lookup: {
              from: "users",
              localField: "lastMessage.senderId",
              foreignField: "_id",
              as: "lastMessageSender",
            },
          },
          {
            $unwind: {
              path: "$lastMessageSender",
              preserveNullAndEmptyArrays: true, // Keep documents even if no sender is found
            },
          },
          {
            // Project the necessary fields, including the sender's name for group chats
            $project: {
              chatImage: 1,
              chatName: 1,
              isGroup: 1,
              lastMessageSenderName: "$lastMessageSender.username",
              lastMessageContent: {
                $arrayElemAt: ["$lastMessage.content", 0],
              },
              lastSentTime: "$lastMessage.createdAt",
            },
          },
          {
            // Sort by the latest message sent time in descending order
            $sort: {
              lastSentTime: -1,
            },
          },
        ])
        .toArray();

      return NextResponse.json(
        { success: true, chats: chats },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
