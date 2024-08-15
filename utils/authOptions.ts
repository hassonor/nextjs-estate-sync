import {AuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {Profile} from 'next-auth';
import connectDB from "@/config/database";
import User from "@/models/User";
import {UserDoc} from "@/interfaces/user.interface";

interface ExtendedProfile extends Profile {
    picture?: string;
}

// Define the authOptions with proper types
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    callbacks: {
        async signIn({profile}: { profile?: ExtendedProfile }) {
            await connectDB();
            const userExists = await User.findOne({email: profile!.email})
            if (!userExists) {
                // Truncate username if too long
                const username = profile?.name!.slice(0, 20);

                await User.create({
                    email: profile!.email,
                    username,
                    image: profile?.picture!
                })
            }
            return true;
        },
        async session({session}: { session: any }) {
            const user: UserDoc | null = await User.findOne({email: session.user.email}).lean();
            session.user.id = user?._id?.toString();
            return session;
        }
    }
}
