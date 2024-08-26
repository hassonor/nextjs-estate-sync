'use client';

import {FC} from "react";
import Image from "next/image";
import {Gallery, Item} from "react-photoswipe-gallery";

interface PropertyImagesProps {
    images: string[];
}

const PropertyImages: FC<PropertyImagesProps> = ({images}) => {
    return (
        <Gallery>
            <section className='bg-blue-50 p-4'>
                {images.length == 1 ? (
                    <Item
                        original={images[0]}
                        thumbnail={images[0]}
                        width="1000"
                        height="600"
                    >
                        {({ref, open}) => (
                            <Image src={images[0]}
                                   ref={ref}
                                   onClick={open}
                                   alt='' className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                                   width={1800} height={400} priority={true}/>
                        )}
                    </Item>
                ) : (
                    <div className='grid grid-cols-2 gap-4'>
                        {images.map((image, index) => (
                            <div key={index}
                                 className={`${images.length === 3 && index === 2 ? ' col-span-2' : 'col-span-1'}`}>
                                <Item
                                    original={image}
                                    thumbnail={image}
                                    width="1000"
                                    height="600"
                                >
                                    {({ref, open}) => (
                                        <Image ref={ref}
                                               onClick={open}
                                               src={image} alt=''
                                               className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                                               width={1800} height={400} priority={true}/>
                                    )}
                                </Item>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </Gallery>
    );
};

export default PropertyImages;
