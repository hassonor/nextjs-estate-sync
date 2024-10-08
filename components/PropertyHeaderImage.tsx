import Image from "next/image";

interface PropertyHeaderImageProps {
    image: string
}

const PropertyHeaderImage = ({image}: PropertyHeaderImageProps) => {
    return (<section>
        <div className="container-xl m-auto">
            <div className="grid grid-cols-1">
                <Image
                    src={image}
                    alt=""
                    className="object-cover h-[230px] w-full"
                    width={0}
                    height={0}
                    sizes='80vw'
                />
            </div>
        </div>
    </section>)
}

export default PropertyHeaderImage;