import Link from "next/link";
import {ReactNode} from 'react';

interface InfoBoxProps {
    heading: string;
    description: string;
    buttonInfo: { text: string, link: string, backgroundColor: string }
    backgroundColor?: string;
    textColor?: string;
}

const InfoBox = ({
                     heading,
                     buttonInfo,
                     description,
                     backgroundColor = 'bg-gray-100',
                     textColor = 'text-gray-800'
                 }: InfoBoxProps) => {
    return (
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor}text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
                {description}
            </p>
            <Link
                href={buttonInfo.link}
                className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
            >
                {buttonInfo.text}
            </Link>
        </div>
    );
}

export default InfoBox;
