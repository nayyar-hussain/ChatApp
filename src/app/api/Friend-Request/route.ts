import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../config/Database";
import FriendRequest from "../../../../model/Friend-Request";
import User from "../../../../model/User";


export async function GET(req: NextRequest) {
    try {
        await ConnectToDatabase();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');


        if (!userId) {
            return NextResponse.json({ status: 400, msg: "User ID is required" });
        }

        // Incoming friend requests fetch karo (jahan userId receiver ho)
        const friendRequests = await FriendRequest.find({ receiverId: userId });

        // Har request ke liye sender ka data fetch karo
        const populatedRequests = await Promise.all(
            friendRequests.map(async (request) => {
                const sender = await User.findOne({ _id: request.senderId }).select("name bio ImageUrl");

                return {
                    ...request.toObject(),
                    sender: sender ? sender.toObject() : null, // Sender ka data add karo
                };
            })
        );

        return NextResponse.json({
            status: 200,
            msg: "Friend requests fetched successfully",
            populatedRequests
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, msg: error });
    }
}