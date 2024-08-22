import {Schema, model, models, Model} from 'mongoose';
import {IMessage, MessageDoc} from "@/interfaces/message.interface";


interface MessageModel extends Model<MessageDoc> {
    build(attrs: Omit<IMessage, '_id' | 'createdAt' | 'updatedAt'>): MessageDoc;
}

const MessageSchema = new Schema<MessageDoc>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        property: {
            type: Schema.Types.ObjectId,
            ref: 'Property',
            required: true
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        phone: String,
        body: String,
        read: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true,
    }
);

// Static build method to create a new message
MessageSchema.statics.build = function (attrs: Omit<IMessage, '_id' | 'createdAt' | 'updatedAt'>) {
    return new this(attrs);
};

// Define the Message model with the static method
const Message = (models.Message as MessageModel) || model<MessageDoc, MessageModel>('Message', MessageSchema);

export default Message;
