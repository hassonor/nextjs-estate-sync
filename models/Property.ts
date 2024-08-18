import {Schema, model, models, Model, Types} from 'mongoose';
import {IProperty, PropertyDoc} from "@/interfaces/property.interface";

// Define the properties that a Property Model has
interface PropertyModel extends Model<PropertyDoc> {
    build(attrs: Omit<IProperty, '_id' | 'createdAt' | 'updatedAt'>): PropertyDoc;
}

const PropertySchema = new Schema<PropertyDoc>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        location: {
            street: {type: String},
            city: {type: String},
            state: {type: String},
            zipcode: {type: String},
        },
        beds: {
            type: Number,
            required: true,
        },
        baths: {
            type: Number,
            required: true,
        },
        square_feet: {
            type: Number,
            required: true,
        },
        amenities: [
            {type: String},
        ],
        rates: {
            nightly: Number,
            weekly: Number,
            monthly: Number,
        },
        seller_info: {
            name: String,
            email: String,
            phone: String,
        },
        images: [
            {
                type: String,
            },
        ],
        is_featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Static build method to create a new Property
PropertySchema.statics.build = function (attrs: Omit<IProperty, '_id' | 'createdAt' | 'updatedAt'>) {
    return new this(attrs);
};

// Define the Property model with the static method
const Property = models.Property || model<PropertyDoc, PropertyModel>('Property', PropertySchema);

export default Property;
