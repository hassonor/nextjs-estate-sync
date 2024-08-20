'use server';
import connectDB from '@/config/database';
import Property from "@/models/Property";
import {getSessionUser} from "@/utils/getSessionUser";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import cloudinary from "@/config/cloudinary";

interface PropertyFormData {
    getAll: (field: string) => FormDataEntryValue[];
    get: (field: string) => FormDataEntryValue | null;
}

async function updateProperty(propertyId: string, formData: PropertyFormData) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const {userId} = sessionUser;

    // Access all values from amenities and images
    const amenities = formData.getAll('amenities') as string[];
    // const images = formData.getAll('images') as File[];

    const propertyData: any = {
        owner: userId,
        type: formData.get('type') as string | null,
        name: formData.get('name') as string | null,
        description: formData.get('description') as string | null,
        location: {
            street: formData.get('location.street') as string | null,
            city: formData.get('location.city') as string | null,
            state: formData.get('location.state') as string | null,
            zipcode: formData.get('location.zipcode') as string | null,
        },
        beds: formData.get('beds') as string | null,
        baths: formData.get('baths') as string | null,
        square_feet: formData.get('square_feet') as string | null,
        amenities,
        rates: {
            nightly: formData.get('rates.nightly') as string | null,
            weekly: formData.get('rates.weekly') as string | null,
            monthly: formData.get('rates.monthly') as string | null,
        },
        seller_info: {
            name: formData.get('seller_info.name') as string | null,
            email: formData.get('seller_info.email') as string | null,
            phone: formData.get('seller_info.phone') as string | null,
        },
    };

    // // Upload images to Cloudinary and get the URLs
    // const imageUrls: string[] = [];
    // for (const imageFile of images) {
    //     if (imageFile instanceof File && imageFile.name !== '') {
    //         const imageBuffer = await imageFile.arrayBuffer();
    //         const imageArray = Array.from(new Uint8Array(imageBuffer));
    //         const imageData = Buffer.from(imageArray);
    //
    //         // Convert to base64
    //         const imageBase64 = imageData.toString('base64');
    //
    //         // Upload to Cloudinary
    //         const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
    //             folder: 'EstateSync',
    //         });
    //
    //         imageUrls.push(result.secure_url);
    //     }
    // }
    //
    // propertyData.images = imageUrls;

    const updateProperty = await Property.findByIdAndUpdate(propertyId, propertyData);

    // Revalidate the cache and redirect
    revalidatePath('/', 'layout');
    redirect(`/properties/${updateProperty._id}`);
}

export default updateProperty;
