import React from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'next-share';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ShareBox(props: { about: string }) {
    const { toast } = useToast();
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        toast({
            description: 'Copied to clipboard',
        });
    }
    return (
        <div className="flex items-center justify-center space-x-2">
            <FacebookShareButton url={window.location.href} quote={props.about}>
                <FacebookIcon size={42} round />
            </FacebookShareButton>
            <PinterestShareButton
                url={window.location.href}
                media={props.about}
            >
                <PinterestIcon size={42} round />
            </PinterestShareButton>
            <TwitterShareButton url={window.location.href} title={props.about}>
                <TwitterIcon size={42} round />
            </TwitterShareButton>
            <WhatsappShareButton
                url={window.location.href}
                title={props.about}
                separator=":: "
            >
                <WhatsappIcon size={42} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon size={42} round />
            </LinkedinShareButton>
            <Button onClick={handleCopy} className="bg-primary-foreground rounded-full" variant="secondary" size="icon">
                <Link/>
            </Button>
        </div>
    );
}
