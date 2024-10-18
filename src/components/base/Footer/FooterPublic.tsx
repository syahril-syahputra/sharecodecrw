import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function FooterPublic() {
    return (
        <div className="bg-black py-8 text-white">
            <div className="container flex items-end justify-around p-0">
                <div className="">
                    <div className="flex items-end space-x-4">
                        <div className=" font-koulen text-[180px]">C</div>
                        <div className="mb-16 flex flex-col">
                            <span className="font-koulen text-4xl">
                                CROWNER
                            </span>
                            <span>Simplest to use</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="mb-16 font-koulen text-4xl">Resources</div>
                </div>
            </div>
            <div className="container flex items-start justify-around">
                <div className=" space-y-4 text-xl">
                    <div className="flex items-center space-x-2">
                        <Phone />
                        <span>0089 009 002 443</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mail />
                        <span>info@crowner.ca</span>
                    </div>
                </div>

                <div className="flex list-none flex-col space-y-4 text-2xl">
                    <Link href={'/'}>
                        <li>Home</li>
                    </Link>
                    <Link href={'/'}>
                        <li>Cookie</li>
                    </Link>
                    <Link href={'/'}>
                        <li>Privacy & Policy</li>
                    </Link>
                </div>
            </div>
            <div className="pb-20 pt-24 text-center text-xl">
                Crowner - {new Date().getFullYear()}
            </div>
        </div>
    );
}
