import {FC} from "react";
import Image from "next/image";

interface PropertyImagesProps {
    images: string[];
}

const PropertyImages: FC<PropertyImagesProps> = ({images}) => {
    return (
        <section className='bg-blue-50 p-4'>
            {images.length == 1 ? (
                <Image src={images[0]} alt='' className='object-cover h-[400px] mx-auto rounded-xl'
                       width={1800} height={400} priority={true}/>
            ) : (
                <div className='grid grid-cols-2 gap-4'>
                    {images.map((image, index) => (
                        <div key={index}
                             className={`${images.length === 3 && index === 2 ? ' col-span-2' : 'col-span-1'}`}>
                            <Image src={image} alt='' className='object-cover h-[400px] w-full rounded-xl'
                                   width={1800} height={400} priority={true}/>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default PropertyImages;
