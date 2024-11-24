import { getDBConnection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
  try {
    const dbConnection = await getDBConnection();
    if (dbConnection) {
      const userDetails = await dbConnection
        .collection("users")
        .aggregate([
          {
            $match: {
              _id: new ObjectId(userId),
            },
          },
          {
            $project: {
              username: 1,
              imageUrl: 1,
              email: 1,
            },
          },
        ])
        .toArray();

      return NextResponse.json(
        { success: true, userDetails: userDetails },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
