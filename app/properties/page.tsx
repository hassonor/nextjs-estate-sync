import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyCard from "@/components/PropertyCard";
import {IProperty} from "@/interfaces/property.interface";
import Pagination from "@/components/Pagination";


interface PropertiesPageProps {
    searchParams: {
        page?: string | number;
        pageSize?: string | number;
    };
}

const PropertiesPage = async ({searchParams: {page = 1, pageSize = 9}}: PropertiesPageProps) => {
    await connectDB();

    const parsedPage = typeof page === "string" ? parseInt(page, 10) : page;
    const parsedPageSize = typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize;


    const skip = (parsedPage - 1) * parsedPageSize;
    const total = await Property.countDocuments({});
    const properties: IProperty[] = await Property.find({}).skip(skip).limit(parsedPageSize);

    const showPagination = total > parsedPageSize;

    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {properties.map((property: IProperty) => (
                            <PropertyCard key={property._id} property={property}/>
                        ))}
                    </div>
                )}
                {showPagination && (<Pagination page={parsedPage} pageSize={parsedPageSize} totalItems={total}/>)}
            </div>
        </section>
    );
};

export default PropertiesPage;