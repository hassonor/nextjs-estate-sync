import mongoose, {Types} from "mongoose";
import {IProperty} from "@/interfaces/property.interface";

export interface IUser {
    email: string;
    username: string;
    image: string;
    bookmarks?: Types.ObjectId[] | IProperty[];
}


export interface UserDoc extends IUser, Document {
    _id?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}