import {NextResponse} from 'next/server';
import {Property} from '@/models/Property';
import connectDB from '@/config/database';
import {IProperty} from '@/interfaces/property.interface';

// POST request handler to create a new property
export const POST = async (request: Request) => {
    await connectDB();

    try {
        const propertyData: Omit<IProperty, '_id' | 'createdAt' | 'updatedAt'> = await request.json();

        const newProperty = new Property(propertyData);
        await newProperty.save();

        return NextResponse.json(newProperty, {status: 201});
    } catch (error) {
        return NextResponse.json({message: 'Server Error', error}, {status: 500});
    }
};
