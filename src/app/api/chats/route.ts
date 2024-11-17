import Conversation from "@/lib/mongodb/models/conversation";
import dbConnect from "@/lib/mongodb/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    const conversations = await Conversation.find();
    return NextResponse.json(
      { success: true, conversations: conversations },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
