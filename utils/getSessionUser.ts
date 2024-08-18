import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOptions";
import {Session} from "next-auth";
import {DefaultUser} from "next-auth";

export const getSessionUser = async (): Promise<{ user: Session["user"], userId: string } | null> => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return null;
    }

    return {
        user: session.user,
        userId: (session.user as DefaultUser).id
    };
};
