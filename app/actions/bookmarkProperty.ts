'use server';

import mongoose, {Types} from "mongoose";
import connectDB from "@/config/database";
import User from "@/models/User";
import {getSessionUser} from "@/utils/getSessionUser";
import {revalidatePath} from "next/cache";

async function bookmarkProperty(propertyId: string) {
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

    let message;
    if (isBookmarked) {
        // If already bookmarked, remove it using Mongoose's pull method
        bookmarks.pull(propertyId);
        message = 'Bookmark Removed';
        isBookmarked = false;
    } else {
        // Otherwise, add the bookmark
        bookmarks.push(propertyObjectId);
        message = 'Bookmark Added';
        isBookmarked = true;
    }

    // Save the user document
    await user.save();

    // Revalidate the cached path
    revalidatePath('/properties/saved', 'page');

    return {
        message,
        isBookmarked
    };
}

export default bookmarkProperty;
