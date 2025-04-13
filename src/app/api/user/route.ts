import {  NextRequest, NextResponse } from "next/server";
import User from "../../../../model/User";
import { ConnectToDatabase } from "../../../../config/Database";
import FriendRequest from "../../../../model/Friend-Request";

export async function GET( )  {
    try {
       ConnectToDatabase()
        const users = await User.find({})
        
        if(!users) {
            return NextResponse.json({status :400 , msg : "No users found"})

        }
        return NextResponse.json({status :200 , users})

    } catch (error) {
        return NextResponse.json({status :500 , error})
    }
}


export async function POST(req: NextRequest) {
    try {
        const { userId , rid} = await req.json()
        ConnectToDatabase()
        const findSenAndRec = await FriendRequest.find({senderId : userId , receiverId : rid })
        if(!findSenAndRec){
            return NextResponse.json({status :400 , msg : "You are already friends"})
        }
        await FriendRequest.create({
            senderId : userId,
            receiverId : rid,
            
        })
        return NextResponse.json({status :200 })

    } catch (error) {
        return NextResponse.json({status :500 , error})

    }
}