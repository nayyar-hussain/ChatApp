import { NextRequest, NextResponse } from "next/server";
import Message from "../../../../model/message";
import { ConnectToDatabase } from "../../../../config/Database";

export async function POST(req : NextRequest) {
    try {
        const { userId , receiverId , content} = await req.json()
        if(!content){
            return NextResponse.json({status : 400 , msg : 'please type message'})
        }

        ConnectToDatabase()
        await Message.create({
            senderId : userId,
            receiverId,
            content
        })
        return NextResponse.json({status : 200 })
    } catch (error) {
        return NextResponse.json({status : 500 , error})
    }
}