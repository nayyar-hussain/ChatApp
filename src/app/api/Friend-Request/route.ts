import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../config/Database";
import FriendRequest from "../../../../model/Friend-Request";


export async function GET(req: NextRequest) {
    try {
        ConnectToDatabase()
       const { searchParams} = new URL(req.url)
       const userId = searchParams.get('userId')
       
        if(!userId) {
            return NextResponse.json({status : 400 , msg : 'user not found'})
        }

        const friendRequests = await FriendRequest.find({receiverId : userId}).populate('senderId')
        if(friendRequests){
            return NextResponse.json({ status : 200, friendRequests})
        }
    } catch (error) {
        return NextResponse.json({ status : 500, msg : error})
    }
}