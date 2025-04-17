import { model, models, Schema } from "mongoose";

interface IFriend {
    userId : string,
    friendId : string,
    status : string
}

const friendSchema : Schema = new Schema({
    userId : {type : String ,required : true},
    friendId : {type : String , required : true},
    status : {type : String , default : 'accepted'}
} , {timestamps : true})


const friendModel = models.Friend || model<IFriend>('Friend' , friendSchema)

export default friendModel