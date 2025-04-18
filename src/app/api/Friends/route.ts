import { NextRequest, NextResponse } from "next/server";
import friendModel from "../../../../model/Friends";
import { ConnectToDatabase } from "../../../../config/Database";
import User from "../../../../model/User";
import FriendRequest from "../../../../model/Friend-Request";

export async function POST(req: NextRequest) {
    try {
        const { userId, friendId } = await req.json();
        await ConnectToDatabase();

        // Check if they are already friends
        const isFriends = await friendModel.findOne({
            $or: [
                { userId, friendId },
                { userId: friendId, friendId: userId },
            ],
        });

        if (isFriends) {
            return NextResponse.json({ status: 400, msg: "Already friends" });
        }

        // Create mutual friend entries
        await friendModel.create([
            { userId, friendId }, // person1 -> person2
            { userId: friendId, friendId: userId }, // person2 -> person1
        ]);

        // Delete the friend request
        await FriendRequest.findOneAndDelete({
            senderId: friendId,
            receiverId: userId,
        });

        return NextResponse.json({ status: 200, msg: "Friend added successfully" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: 400, error: error });
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

        // Fetch all friends where the userId is present
        const friendRecords = await friendModel.find({ userId });

        // Fetch friend details for each friend record
        const friends = await Promise.all(
            friendRecords.map(async (record) => {
                const friend = await User.findOne({ _id: record.friendId }).select(
                    "name bio ImageUrl"
                );
                return {
                    ...record.toObject(),
                    friend: friend ? friend.toObject() : null,
                };
            })
        );

        return NextResponse.json({
            status: 200,
            msg: "Friends fetched successfully",
            friends,
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, msg: error });
    }
}