import {Schema, model, models, Model} from 'mongoose';
import {IUser, UserDoc} from "@/interfaces/user.interface";


interface UserModel extends Model<UserDoc> {
    build(attrs: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): UserDoc;
}

const UserSchema = new Schema<UserDoc>(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
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
    },
    {
        timestamps: true,
    }
);

// Static build method to create a new user
UserSchema.statics.build = function (attrs: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>) {
    return new this(attrs);
};

// Define the User model with the static method
const User = (models.User as UserModel) || model<UserDoc, UserModel>('User', UserSchema);

export default User;
