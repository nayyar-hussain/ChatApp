import {  NextResponse } from "next/server";
import User from "../../../../model/User";
import { ConnectToDatabase } from "../../../../config/Database";

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