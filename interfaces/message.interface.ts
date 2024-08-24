import mongoose, {Document} from "mongoose";


export interface IMessage {
    _id?: string;
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
    _id?: string;
    createdAt: Date;
    updatedAt: Date;
}
