import { Schema } from "mongoose";

export const UserSchema =  new Schema({
    name: {type:String, require:true},
    lastName: String,
    userName: {type:String, require:true},
    email: String,
    password: String,
    phoneNumber: String,
    profilePhotoUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

