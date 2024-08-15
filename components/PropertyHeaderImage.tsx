import Image from "next/image";

interface PropertyHeaderImageProps {
    image: string
}

const PropertyHeaderImage = ({image}: PropertyHeaderImageProps) => {
    return (<section>
        <div className="container-xl m-auto">
            <div className="grid grid-cols-1">
                <Image
                    src={`/images/properties/${image}`}
                    alt=""
                    className="object-cover h-[400px] w-full"
                    width={0}
                    height={0}
                    sizes='100vw'
                />
            </div>
        </div>
    </section>)
}

export default PropertyHeaderImage;