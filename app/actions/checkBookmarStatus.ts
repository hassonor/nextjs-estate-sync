'use server';

import mongoose, {Types} from "mongoose";
import connectDB from "@/config/database";
import User from "@/models/User";
import {getSessionUser} from "@/utils/getSessionUser";
import bookmarkProperty from "@/app/actions/bookmarkProperty";


async function checkBookmarkStatus(propertyId: string) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    const propertyObjectId = new mongoose.Types.ObjectId(propertyId);
    const bookmarks = user.bookmarks as Types.DocumentArray<Types.ObjectId>;

    let isBookmarked = bookmarks.some(bookmark => bookmark.equals(propertyObjectId));

    return {isBookmarked};
}

export default checkBookmarkStatus;