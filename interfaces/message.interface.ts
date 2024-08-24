import mongoose, {Document} from "mongoose";


export interface IMessage {
    sender: mongoose.Types.ObjectId;
    recipient: mongoose.Types.ObjectId;
    property: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone?: string;
    body?: string;
    read?: boolean;
    createdAt?: Date;
}


export interface MessageDoc extends Document, IMessage {
    _id?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
