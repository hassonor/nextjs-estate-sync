'use server';
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import {getSessionUser} from "@/utils/getSessionUser";
import {revalidatePath} from "next/cache";

async function deleteProperty(propertyId: string) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User Id is required');
    }

    const {userId} = sessionUser;

    const property = await Property.findById(propertyId);
    if (!property) throw new Error('Property Not Found');

    // Verify ownership
    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    // Extract public id from URLs
    const publicIds = property.images.map((imageUrl: string): string | null => {
        const parts = imageUrl.split('/');
        const fileName = parts[parts.length - 1];
        return fileName ? fileName.split('.')[0] : null;
    });

    // Delete images from cloudinary
    if (publicIds.length > 0) {
        await Promise.all(publicIds.map((publicId: string) =>
            cloudinary.uploader.destroy(`estatesync/${publicId}`)
        ));
    }

    await property.deleteOne();

    revalidatePath('/', 'layout');

}

export default deleteProperty;