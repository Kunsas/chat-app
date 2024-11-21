import Chat from "@/lib/mongodb/models/chat";
import dbConnect from "@/lib/mongodb/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    const chats = await Chat.aggregate([
      {
        $facet: {
          // Separate pipeline for group chats (isGroup: true)
          groupChats: [
            { $match: { isGroup: true } }, // Filter only group chats
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
                preserveNullAndEmptyArrays: true,
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
              // Perform $lookup to get sender's details only for group chats
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
                preserveNullAndEmptyArrays: true,
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
          ],

          // Separate pipeline for non-group chats (isGroup: false)
          nonGroupChats: [
            { $match: { isGroup: false } }, // Filter only non-group chats
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
                preserveNullAndEmptyArrays: true,
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
              // Project the necessary fields, without sender's name for non-group chats
              $project: {
                chatImage: 1,
                chatName: 1,
                isGroup: 1,
                lastMessageSenderName: null,
                lastMessageContent: {
                  $arrayElemAt: ["$lastMessage.content", 0],
                },
                lastSentTime: "$lastMessage.createdAt",
              },
            },
          ],
        },
      },
      {
        // Combine the results from both pipelines
        $project: {
          combinedChats: { $concatArrays: ["$groupChats", "$nonGroupChats"] },
        },
      },
      {
        // Unwind the combined array to transform it back into individual documents
        $unwind: "$combinedChats",
      },
      {
        // Replace the root document with the merged chat data
        $replaceRoot: { newRoot: "$combinedChats" },
      },
      {
        // Sort the combined output in descending order of lastSentTime
        $sort: {
          lastSentTime: -1, // Descending order
        },
      },
    ]);

    return NextResponse.json({ success: true, chats: chats }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
