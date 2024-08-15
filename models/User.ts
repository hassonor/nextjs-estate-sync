import {Schema, model, models, Document, Model} from 'mongoose';

interface IUser extends Document {
    email: string;
    username: string;
    image?: string;
    bookmarks: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: [true, 'Email already exists'] as unknown as boolean,
        required: [true, 'Email is required'] as unknown as boolean,
    },
    username: {
        type: String,
        required: [true, 'Username is required'] as unknown as boolean,
    },
    image: {
        type: String,
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property',
        },
    ],
}, {
    timestamps: true,
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
