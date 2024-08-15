import mongoose, {Types} from "mongoose";

export interface IUser {
    email: string;
    username: string;
    image: string;
    bookmarks?: Types.ObjectId[];
}


export interface UserDoc extends IUser, Document {
    _id?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}