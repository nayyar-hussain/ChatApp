import { NextRequest, NextResponse } from "next/server";
import Message from "../../../../model/message";
import { ConnectToDatabase } from "../../../../config/Database";
import User from "../../../../model/User";

export async function POST(req: NextRequest) {
  try {
    const { userId, receiverId, content } = await req.json();
    // Validation
    if (!userId || !receiverId || !content) {
      return NextResponse.json({ status: 400, msg: "userId, receiverId, and content are required" });
    }

    await ConnectToDatabase();
    const message = await Message.create({
      senderId: userId,
      receiverId,
      content,
    });

    return NextResponse.json({ status: 200, msg: "Message sent successfully", message });
  } catch (error) {
    console.error("Error in POST /api/messages:", error);
    return NextResponse.json({ status: 500, msg: error });
  }
}

export async function GET(req: NextRequest) {
  try {
    await ConnectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ status: 400, msg: "User ID is required" });
    }

    // Fetch messages where userId is either senderId or receiverId
    const friendMessages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 }); // Sort by latest first

    // Fetch sender and receiver details for each message
    const messages = await Promise.all(
      friendMessages.map(async (msg) => {
        const sender = await User.findOne({ _id: msg.senderId }).select("name ImageUrl");
        const receiver = await User.findOne({ _id: msg.receiverId }).select("name ImageUrl");
        return {
          ...msg.toObject(),
          sender: sender ? sender.toObject() : null,
          receiver: receiver ? receiver.toObject() : null,
        };
      })
    );

    return NextResponse.json({
      status: 200,
      msg: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.error("Error in GET /api/messages:", error);
    return NextResponse.json({ status: 500, msg: error });
  }
}