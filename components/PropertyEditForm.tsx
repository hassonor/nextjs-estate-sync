import {IProperty} from "@/interfaces/property.interface";
import updateProperty from "@/app/actions/updateProperty";

interface PropertyEditFormProps {
    property: IProperty;
}

const PropertyEditForm = ({property}: PropertyEditFormProps) => {
    const updatePropertyById = updateProperty.bind(null, property._id!);

    return (
        <form action={updatePropertyById} method="POST" encType="multipart/form-data">
            <h2 className='text-3xl text-center font-semibold mb-6'>Edit Property</h2>

            {/* Property Type Field */}
            <div className='mb-4'>
                <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
                    Property Type
                </label>
                <select
                    id='type'
                    name='type'
                    className='border rounded w-full py-2 px-3'
                    defaultValue={property.type}
                    required
                >
                    <option value='Apartment'>Apartment</option>
                    <option value='Condo'>Condo</option>
                    <option value='House'>House</option>
                    <option value='CabinOrCottage'>Cabin or Cottage</option>
                    <option value='Room'>Room</option>
                    <option value='Studio'>Studio</option>
                    <option value='Other'>Other</option>
                </select>
            </div>

            {/* Listing Name Field */}
            <div className='mb-4'>
                <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                    Listing Name
                </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    className='border rounded w-full py-2 px-3'
                    placeholder='e.g., Beautiful Apartment in Miami'
                    defaultValue={property.name}
                    required
                />
            </div>

            {/* Description Field */}
            <div className='mb-4'>
                <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>
                    Description
                </label>
                <textarea
                    id='description'
                    name='description'
                    className='border rounded w-full py-2 px-3'
                    rows={4}
                    placeholder='Add an optional description of your property'
                    defaultValue={property.description}
                ></textarea>
            </div>

            {/* Location Fields */}
            <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>Location</label>
                <input
                    type='text'
                    id='street'
                    name='location.street'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Street'
                    defaultValue={property.location.street}
                />
                <input
                    type='text'
                    id='city'
                    name='location.city'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='City'
                    defaultValue={property.location.city}
                    required
                />
                <input
                    type='text'
                    id='state'
                    name='location.state'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='State'
                    defaultValue={property.location.state}
                    required
                />
                <input
                    type='text'
                    id='zipcode'
                    name='location.zipcode'
                    className='border rounded w-full py-2 px-3 mb-2'
                    defaultValue={property.location.zipcode}
                    placeholder='Zipcode'
                />
            </div>

            {/* Beds and Baths Fields */}
            <div className='mb-4 flex flex-wrap'>
                <div className='w-full sm:w-1/3 pr-2'>
                    <label htmlFor='beds' className='block text-gray-700 font-bold mb-2'>
                        Beds
                    </label>
                    <input
                        type='number'
                        id='beds'
                        name='beds'
                        className='border rounded w-full py-2 px-3'
                        defaultValue={property.beds}
                        required
                    />
                </div>
                <div className='w-full sm:w-1/3 px-2'>
                    <label htmlFor='baths' className='block text-gray-700 font-bold mb-2'>
                        Baths
                    </label>
                    <input
                        type='number'
                        id='baths'
                        name='baths'
                        className='border rounded w-full py-2 px-3'
                        defaultValue={property.baths}
                        required
                    />
                </div>
                <div className='w-full sm:w-1/3 pl-2'>
                    <label htmlFor='square_feet' className='block text-gray-700 font-bold mb-2'>
                        Square Feet
                    </label>
                    <input
                        type='number'
                        id='square_feet'
                        name='square_feet'
                        className='border rounded w-full py-2 px-3'
                        defaultValue={property.square_feet}
                        required
                    />
                </div>
            </div>

            {/* Image Upload Section */}
            <div className='mb-4'>
                <label htmlFor='newImages' className='block text-gray-700 font-bold mb-2'>
                    Upload New Images
                </label>
                <input
                    type='file'
                    id='newImages'
                    name='newImages'
                    className='border rounded w-full py-2 px-3'
                    accept='image/*'
                    multiple
                />
            </div>

            {/* Image Removal Section */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Existing Images</label>
                <div className="flex flex-wrap gap-4">
                    {property.images && property.images.length > 0 ? (
                        property.images.map((image, index) => (
                            <div key={index} className="w-1/4 relative">
                                <img
                                    src={image}
                                    alt={`Property Image ${index + 1}`}
                                    className="object-cover rounded-lg shadow-lg"
                                />
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        id={`removeImage${index}`}
                                        name="imagesToRemove"
                                        value={image}
                                    />
                                    <label htmlFor={`removeImage${index}`} className="ml-2 text-sm">
                                        Remove Image
                                    </label>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No images uploaded.</p>
                    )}
                </div>
            </div>

            {/* Submit button */}
            <div>
                <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit'
                >
                    Update Property
                </button>
            </div>
        </form>
    );
};

export default PropertyEditForm;
