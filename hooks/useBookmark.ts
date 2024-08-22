import {useState, useEffect, useCallback} from 'react';
import {toast} from 'react-toastify';

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarStatus";

export const useBookmark = (propertyId: string, userId: string | undefined) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const getBookmarkStatus = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            const res: any = await checkBookmarkStatus(propertyId);
            if (res.error) {
                toast.error(res.error);
            } else {
                setIsBookmarked(res.isBookmarked);
            }
        } catch (error) {
            toast.error('Failed to check bookmark status.');
        } finally {
            setLoading(false);
        }
    }, [userId, propertyId]);

    const toggleBookmark = async () => {
        if (!userId) {
            toast.error('You need to be signed in to bookmark a listing');
            return;
        }

        if (loading) return;

        const prevState = isBookmarked;
        setIsBookmarked(!isBookmarked);

        try {
            const res: any = await bookmarkProperty(propertyId);
            if (res.error) {
                throw new Error(res.error);
            } else {
                toast.success(res.message || 'Bookmark status updated.');
            }
        } catch (error: any) {
            setIsBookmarked(prevState);
            toast.error(error.message || 'Failed to update the bookmark status.');
        }
    };

    useEffect(() => {
        getBookmarkStatus();
    }, [getBookmarkStatus]);

    return {isBookmarked, toggleBookmark, loading};
};
