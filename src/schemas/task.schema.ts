import { Schema } from "mongoose";

export const TaskSchema =  new Schema({
    title: {type:String, require:true},
    description: String,
    status: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
})

