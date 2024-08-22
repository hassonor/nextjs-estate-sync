'use client';
import {FaBookmark} from "react-icons/fa";
import {useSession} from "next-auth/react";
import {IProperty} from "@/interfaces/property.interface";
import {useBookmark} from '@/hooks/useBookmark';
import {ClipLoader} from "react-spinners";

interface BookmarkButtonProps {
    property: IProperty;
}

const BookmarkButton = ({property}: BookmarkButtonProps) => {
    const {data: session}: { data: any } = useSession();
    const userId = session?.user?.id;

    const {isBookmarked, toggleBookmark, loading} = useBookmark(property._id!, userId);

    if (loading) {
        return <button className="bg-gray-200 text-gray-500 w-full py-2 px-4 rounded-full"><ClipLoader color="#3b82f5"
                                                                                                       size={17}
                                                                                                       aria-label='Loading Spinner'/>
        </button>;
    }

    if (loading) return null;

    return (
        <button
            onClick={toggleBookmark}
            className={`${
                isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
        >
            <FaBookmark className="mr-2"/>
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
        </button>
    );
};

export default BookmarkButton;
