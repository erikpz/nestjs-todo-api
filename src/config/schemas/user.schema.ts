import { Schema } from "mongoose";

export const UserSchema =  new Schema({
    name: {type:String, require:true},
    lastName: String,
    email: String,
    phoneNumber: String,
    profilePhotoUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

