import Link from 'next/link';
import connectDB from "@/config/database";
import PropertySearchForm from "@/components/PropertySearchForm";
import {convertToSerializableObject} from "@/utils/convertToObject";
import Property from "@/models/Property";
import PropertyCard from "@/components/PropertyCard";
import {IProperty} from "@/interfaces/property.interface";
import {FaArrowCircleLeft} from "react-icons/fa";

interface SearchResultsPageProps {
    searchParams: {
        location?: string;
        propertyType?: string;
    };
}

const SearchResultsPage = async ({searchParams: {location = '', propertyType = 'All'}}: SearchResultsPageProps) => {
    await connectDB();

    const locationPattern = new RegExp(location, 'i');
    let query: any = {
        $or: [
            {name: locationPattern},
            {description: locationPattern},
            {'location.street': locationPattern},
            {'location.city': locationPattern},
            {'location.state': locationPattern},
            {'location.zipcode': locationPattern}
        ]
    };

    if (propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.type = typePattern;
    }

    try {
        const propertiesQueryResults = await Property.find(query).lean();
        const properties = convertToSerializableObject(propertiesQueryResults);

        return (
            <>
                <section className="bg-blue-700 py-4">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6">
                        <PropertySearchForm/>
                    </div>
                </section>
                <section className="px-4 py-6">
                    <div className="container-xl lg:container m-auto px-4 py-6">
                        <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
                            <FaArrowCircleLeft className='mr-2 mb-1'/> Back To Properties
                        </Link>
                        <h1 className="text-2xl mb-4">Search Results</h1>
                        {properties.length === 0 ? (<p>No search results</p>) : (
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {properties.map((property: IProperty) => (
                                    <PropertyCard key={property._id} property={property}/>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </>
        );
    } catch (error) {
        console.error("Error fetching properties:", error);
        return <p>Failed to load search results. Please try again later.</p>;
    }
};

export default SearchResultsPage;
