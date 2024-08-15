import {NextResponse} from 'next/server';
import {Property} from '@/models/Property';
import connectDB from '@/config/database';
import {Types} from 'mongoose';

// GET request handler to get a property by ID
export const GET = async (request: Request, {params}: { params: { id: string } }) => {
    await connectDB();

    const {id} = params;

    try {
        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: 'Invalid Property ID'}, {status: 400});
        }

        const property = await Property.findById(id);
        if (!property) {
            return NextResponse.json({message: 'Property Not Found'}, {status: 404});
        }

        return NextResponse.json(property, {status: 200});
    } catch (error) {
        return NextResponse.json({message: 'Server Error', error}, {status: 500});
    }
};
