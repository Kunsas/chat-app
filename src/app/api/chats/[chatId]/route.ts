import dbConnect from "@/lib/mongodb/db";
import Chat from "@/lib/mongodb/models/chat";
import Message from "@/lib/mongodb/models/message";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { chatId: string } }
) => {
  console.log("Received chatId in API:", params);
  const chatId = await params.chatId;
  await dbConnect();
  try {
    const chatDetails = await Chat.aggregate([
      {
        // Match the specific chatId from the messages collection first
        $match: {
          _id: new ObjectId(chatId), // Use ObjectId constructor to match the chatId
        },
      },
      {
        // Project the necessary fields: chat image, chat name, sender details, and message content
        $project: {
          chatImageUrl: "$chatImageUrl", // Assuming chat image is stored in chatImageUrl
          chatName: "$name", // Assuming the chat's name is in the "name" field
        },
      },
    ]);

    const messages = await Message.aggregate([
      {
        // Match the specific chatId from the messages collection first
        $match: {
          chatId: new ObjectId(chatId), // Use ObjectId constructor to match the chatId
        },
      },
      {
        // Lookup to join users collection to get sender's details (senderName, senderImage)
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id", // Assuming _id is the identifier for user in the users collection
          as: "senderDetails",
        },
      },
      {
        // Unwind the senderDetails array to get individual sender document
        $unwind: {
          path: "$senderDetails",
          preserveNullAndEmptyArrays: true, // Keep documents even if no sender is found
        },
      },
      {
        // Project the necessary fields: chat image, chat name, sender details, and message content
        $project: {
          senderImage: "$senderDetails.imageUrl", // Assuming the sender's image is in the "image" field of the user document
          senderName: "$senderDetails.username", // Assuming the sender's name is in the "name" field of the user document
          content: {
            $cond: {
              if: { $eq: ["$type", "text"] }, // Only include sender's name if it's a group chat
              then: { $arrayElemAt: ["$content", 0] },
              else: "$content",
            },
          },
          createdAt: "$createdAt",
          type: "$type",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return NextResponse.json(
      { success: true, chatDetails: chatDetails[0], messages: messages },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
