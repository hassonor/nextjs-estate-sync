import InfoBox from "@/components/InfoBox";

const InfoBoxes = () => {
    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox heading="For Renters"
                             description="Rent a property easily with our platform."
                             buttonInfo={{
                                 text: 'Browse Properties',
                                 link: '/properties',
                                 backgroundColor: 'bg-black'
                             }}>
                    </InfoBox>
                    <InfoBox heading="For Property Owners" backgroundColor='bg-blue-100'
                             description="Explore buying options and secure a loan for your new home."
                             buttonInfo={{
                                 text: 'Add Property',
                                 link: '/properties/add',
                                 backgroundColor: 'bg-blue-600'
                             }}>

                    </InfoBox>
                </div>
            </div>
        </section>
    )
}

export default InfoBoxes;
