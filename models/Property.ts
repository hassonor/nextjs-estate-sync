import {model, models, Schema, Document, Model} from 'mongoose';

// Define the interface for the Property document
interface IProperty extends Document {
    owner: Schema.Types.ObjectId;
    name: string;
    type: string;
    description?: string;
    location?: {
        street?: string;
        city?: string;
        state?: string;
        zipcode?: string;
    };
    beds: number;
    bath: number;
    square_feet: number;
    amenities?: string[];
    rates?: {
        nightly?: number;
        weekly?: number;
        monthly?: number;
    };
    seller_info?: {
        name?: string;
        email?: string;
        phone?: string;
    };
    images?: string[];
    is_featured?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        location: {
            street: String,
            city: String,
            state: String,
            zipcode: String
        },
        beds: {
            type: Number,
            required: true
        },
        bath: {
            type: Number,
            required: true
        },
        square_feet: {
            type: Number,
            required: true
        },
        amenities: [
            {type: String}
        ],
        rates: {
            nightly: Number,
            weekly: Number,
            monthly: Number
        },
        seller_info: {
            name: String,
            email: String,
            phone: String
        },
        images: [
            {
                type: String
            }
        ],
        is_featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Property: Model<IProperty> = models.Property || model<IProperty>('Property', PropertySchema);

export default Property;
