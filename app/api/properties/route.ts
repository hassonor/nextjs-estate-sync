import {NextResponse} from 'next/server';
import {Property} from '@/models/Property';
import connectDB from '@/config/database';

// GET request handler to get all properties
export const GET = async () => {
    await connectDB();

    try {
        const properties = await Property.find({});
        return NextResponse.json(properties, {status: 200});
    } catch (error) {
        return NextResponse.json({message: 'Server Error', error}, {status: 500});
    }
};