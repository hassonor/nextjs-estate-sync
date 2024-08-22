'use client';

import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    RedditShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    PinterestShareButton,
    TumblrShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    RedditIcon,
    LinkedinIcon,
    TelegramIcon,
    PinterestIcon,
    TumblrIcon,
} from "react-share";

import {IProperty} from "@/interfaces/property.interface";

interface ShareButtonsProps {
    property: IProperty;
}

const ShareButtons = ({property}: ShareButtonsProps) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

    return (
        <>
            <h3 className="text-xl font-bold text-center pt-2">
                Share This Property:
            </h3>
            <div className="flex flex-wrap justify-center gap-4 pb-5 mx-auto max-w-screen-lg">
                <FacebookShareButton
                    url={shareUrl}
                    hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
                >
                    <FacebookIcon size={40} round={true}/>
                </FacebookShareButton>
                <TwitterShareButton
                    url={shareUrl}
                    title={property.name}
                    hashtags={[property.type.replace(/\s/g, ''), 'ForRent']}
                >
                    <TwitterIcon size={40} round={true}/>
                </TwitterShareButton>
                <WhatsappShareButton
                    url={shareUrl}
                    title={property.name}
                    separator="::"
                >
                    <WhatsappIcon size={40} round={true}/>
                </WhatsappShareButton>
                <EmailShareButton
                    url={shareUrl}
                    subject={`Check out this property: ${property.name}`}
                    body={`Take a look at this property I found: ${shareUrl}`}
                >
                    <EmailIcon size={40} round={true}/>
                </EmailShareButton>
                <RedditShareButton
                    url={shareUrl}
                    title={property.name}
                >
                    <RedditIcon size={40} round={true}/>
                </RedditShareButton>
                <LinkedinShareButton
                    url={shareUrl}
                    title={property.name}
                >
                    <LinkedinIcon size={40} round={true}/>
                </LinkedinShareButton>
                <TelegramShareButton
                    url={shareUrl}
                    title={property.name}
                >
                    <TelegramIcon size={40} round={true}/>
                </TelegramShareButton>
                <PinterestShareButton
                    url={shareUrl}
                    media={`${shareUrl}/image.jpg`}
                >
                    <PinterestIcon size={40} round={true}/>
                </PinterestShareButton>
                <TumblrShareButton
                    url={shareUrl}
                    title={property.name}
                >
                    <TumblrIcon size={40} round={true}/>
                </TumblrShareButton>
            </div>
        </>
    );
};

export default ShareButtons;
