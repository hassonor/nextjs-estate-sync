'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import {getSessionUser} from "@/utils/getSessionUser";
import {revalidatePath} from "next/cache";

async function deleteMessage(messageId: string) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User Id is required');
    }

    const {userId} = sessionUser;

    const message = await Message.findById(messageId);
    if (!message) throw new Error('Message Not Found');

    // Verify ownership
    if (message.recipient.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    await message.deleteOne();

    revalidatePath('/', 'layout');

}

export default deleteMessage;