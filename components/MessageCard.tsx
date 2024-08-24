'use client';

import React, {useState, useMemo} from 'react';
import {toast} from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import {IMessage} from "@/interfaces/message.interface";

interface MessageCardProps {
    message: IMessage;
}

const MessageCard: React.FC<MessageCardProps> = React.memo(({message}) => {
    const [isRead, setIsRead] = useState(message.read);
    const [isLoading, setIsLoading] = useState(false);

    // Memoizing the formatted date to avoid recalculating it on each render
    const formattedDate = useMemo(() => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        }).format(new Date(message.createdAt!));
    }, [message.createdAt]);

    const handleReadClick = async () => {
        setIsLoading(true);
        try {
            const read = await markMessageAsRead(message._id!);
            setIsRead(read);
            toast.success(`Marked as ${read ? 'read' : 'new'}`);
        } catch (error) {
            toast.error('An error occurred while updating the message status.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200 transition-all'>
            {!isRead && (
                <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
                    New
                </div>
            )}
            <h2 className='text-xl mb-4'>
                <span className='font-bold'>Property Inquiry:</span>{' '}
                {(message.property as unknown as IMessage).name}
            </h2>
            <p className='text-gray-700'>{message.body}</p>

            <ul className='mt-4'>
                <li>
                    <strong>Reply Email:</strong>{' '}
                    <a href={`mailto:${message.email}`} className='text-blue-500 hover:underline'>
                        {message.email}
                    </a>
                </li>
                <li>
                    <strong>Reply Phone:</strong>{' '}
                    <a href={`tel:${message.phone}`} className='text-blue-500 hover:underline'>
                        {message.phone}
                    </a>
                </li>
                <li>
                    <strong>Received:</strong>{' '}
                    {formattedDate}
                </li>
            </ul>

            <button
                onClick={handleReadClick}
                disabled={isLoading}
                className={`mt-4 mr-3 py-1 px-3 rounded-md transition-all ${
                    isRead ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'
                } ${isLoading && 'cursor-not-allowed opacity-75'}`}
            >
                {isLoading ? 'Processing...' : isRead ? 'Mark As New' : 'Mark As Read'}
            </button>
        </div>
    );
});

export default MessageCard;
