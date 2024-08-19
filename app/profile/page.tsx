import Image from "next/image";
import connectDB from "@/config/database";
import {getSessionUser} from "@/utils/getSessionUser";
import profileDefault from '@/assets/images/profile.png';
import Property from "@/models/Property";
import ProfileProperties from "@/components/ProfileProperties";
import {IProperty} from "@/interfaces/property.interface";
import {convertToSerializableObject} from "@/utils/convertToObject";

const ProfilePage = async () => {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const {userId} = sessionUser;
    const profileImage = sessionUser?.user?.image;

    const propertiesDocs: IProperty[] = await Property.find({owner: userId}).lean();
    const properties = propertiesDocs.map(convertToSerializableObject);

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage || profileDefault}
                                    alt="User"
                                    width={200}
                                    height={200}
                                />
                            </div>

                            <h2 className="text-2xl mb-4">
                                <span className="font-bold block">Name: </span> {sessionUser?.user?.name}
                            </h2>
                            <h2 className="text-2xl">
                                <span className="font-bold block">Email: </span> {sessionUser?.user?.email}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            <ProfileProperties initialProperties={properties}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
