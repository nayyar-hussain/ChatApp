import { NextRequest, NextResponse } from "next/server";
import friendModel from "../../../../model/Friends";
import { ConnectToDatabase } from "../../../../config/Database";
import User from "../../../../model/User";
import FriendRequest from "../../../../model/Friend-Request";

export async function POST(req: NextRequest) {
    try {
        const { userId , friendId} = await req.json()
        ConnectToDatabase()
        const isFriends = await friendModel.find({userId , friendId})
        if(isFriends.length > 0){
            return NextResponse.json({status : 400 , msg : "already friend"})
        }

        await friendModel.create({
            userId,
            friendId
        })
        await FriendRequest.findOneAndDelete({senderId : friendId})
        return NextResponse.json({status : 200 })

    } catch (error) {
        return NextResponse.json({status : 400 , error})

    }
}

export async function GET(req: NextRequest) {
    try {
        await ConnectToDatabase();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');


        if (!userId) {
            return NextResponse.json({ status: 400, msg: "User ID is required" });
        }

        // Incoming friend requests fetch karo (jahan userId receiver ho)
        const friendRequests = await friendModel.find({  userId });

        // Har request ke liye sender ka data fetch karo
        const Friends = await Promise.all(
            friendRequests.map(async (request) => {
                const sender = await User.findOne({ _id: request.friendId }).select("name bio ImageUrl");

                return {
                    ...request.toObject(),
                    friend: sender ? sender.toObject() : null, // Sender ka data add karo
                };
            })
        );

        return NextResponse.json({
            status: 200,
            msg: "Friend  fetched successfully",
            Friends
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, msg: error });
    }
}