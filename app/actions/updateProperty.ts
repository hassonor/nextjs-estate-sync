'use server';
import connectDB from '@/config/database';
import Property from "@/models/Property";
import {getSessionUser} from "@/utils/getSessionUser";
import {revalidatePath} from "next/cache";
import cloudinary from "@/config/cloudinary";
import {redirect} from "next/navigation";

interface PropertyFormData {
    getAll: (field: string) => FormDataEntryValue[];
    get: (field: string) => FormDataEntryValue | null;
}

export async function updateProperty(propertyId: string, formData: PropertyFormData) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const {userId} = sessionUser;
    const property = await Property.findById(propertyId);

    if (!property) {
        throw new Error('Property Not Found');
    }

    // Verify ownership
    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    // Handle images to remove
    const imagesToRemove: string[] = formData.getAll('imagesToRemove') as string[];

    if (imagesToRemove.length > 0) {
        const publicIds = imagesToRemove.map((imageUrl) => {
            const parts = imageUrl.split('/');
            const fileName = parts[parts.length - 1];
            return fileName.split('.')[0];
        });

        await Promise.all(
            publicIds.map((publicId) => cloudinary.uploader.destroy(`estatesync/${publicId}`))
        );

        property.images = property.images.filter((image: any) => !imagesToRemove.includes(image));
    }

    // Handle new image uploads
    const newImages = formData.getAll('newImages') as File[];
    const uploadedImageUrls: string[] = [];

    if (newImages.length > 0) {
        for (const imageFile of newImages) {
            if (imageFile instanceof File && imageFile.size > 0) {
                // Read the file as Base64
                const arrayBuffer = await imageFile.arrayBuffer();
                const base64String = Buffer.from(arrayBuffer).toString('base64');

                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(
                    `data:${imageFile.type};base64,${base64String}`,
                    {folder: 'estatesync'}
                );
                uploadedImageUrls.push(result.secure_url);
            }
        }

        // Add the uploaded images to the existing images
        property.images = [...property.images, ...uploadedImageUrls];
    }

    // Update property details
    property.type = formData.get('type') as string;
    property.name = formData.get('name') as string;
    property.description = formData.get('description') as string;
    property.location = {
        street: formData.get('location.street') as string,
        city: formData.get('location.city') as string,
        state: formData.get('location.state') as string,
        zipcode: formData.get('location.zipcode') as string,
    };
    property.beds = Number(formData.get('beds'));
    property.baths = Number(formData.get('baths'));
    property.square_feet = Number(formData.get('square_feet'));
    property.amenities = formData.getAll('amenities') as string[];
    property.rates = {
        nightly: Number(formData.get('rates.nightly')),
        weekly: Number(formData.get('rates.weekly')),
        monthly: Number(formData.get('rates.monthly')),
    };
    property.seller_info = {
        name: formData.get('seller_info.name') as string,
        email: formData.get('seller_info.email') as string,
        phone: formData.get('seller_info.phone') as string,
    };

    await property.save();

    // Revalidate cache and redirect
    revalidatePath('/');
    redirect(`/properties/${property._id}`);
}

export default updateProperty;
