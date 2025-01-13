'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import React from 'react';
import Link from 'next/link';
import CompanyRegistration from './Company';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IndividuRegistration from './Individual';
import { User, Users } from 'lucide-react';

// // dark
export default function Page() {
    return (
        <div className="relative mx-auto max-w-xl space-y-8 overflow-hidden rounded-xl bg-gray-900 p-10">
            <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
            <TitleAuth className="!text-4xl !text-white underline">
                Sign Up
            </TitleAuth>
            <div className="">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="mb-4 grid w-full grid-cols-2 bg-transparent text-white">
                        <TabsTrigger
                            className="space-x-2 rounded-lg"
                            value="account"
                        >
                            <User size={18} />
                            <span>Individual</span>
                        </TabsTrigger>
                        <TabsTrigger
                            className="space-x-2 rounded-lg"
                            value="password"
                        >
                            <Users size={18} />
                            <span>Company</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <IndividuRegistration />
                    </TabsContent>
                    <TabsContent value="password">
                        <CompanyRegistration />
                    </TabsContent>
                </Tabs>
            </div>

            <div className="text-center text-white">
                <span className="text-sm">Already have an account?</span>{' '}
                <Link
                    href={'/auth/login'}
                    className="text-sm font-semibold text-primary"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}

// light
// export default function Page() {
//     return (
//         <div className="relative overflow-hidden mx-auto max-w-xl space-y-8 p-10 rounded-xl border-4 border-blue-50">
//             <div className="absolute -top-72 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-blue-800 opacity-10 blur-2xl"></div>
//             <TitleAuth className='!text-gray-800 underline !text-4xl'>Sign Up</TitleAuth>
//             <div className=''>
//                 <Tabs defaultValue="account" className="w-full">
//                     <TabsList className="grid w-full grid-cols-2 bg-transparent mb-4">
//                         <TabsTrigger className='rounded-lg space-x-2' value="account">
//                             <User size={18}/>
//                             <span>Individual</span>
//                         </TabsTrigger>
//                         <TabsTrigger className='rounded-lg space-x-2' value="password">
//                             <Users size={18}/>
//                             <span>Company</span>
//                         </TabsTrigger>
//                     </TabsList>
//                     <TabsContent value="account">
//                         <IndividuRegistrationShine/>
//                     </TabsContent>
//                     <TabsContent value="password">
//                         <CompanyRegistration/>
//                     </TabsContent>
//                 </Tabs>
//             </div>

//             <div className="text-center">
//                 <span className="text-sm">Already have an account?</span>{' '}
//                 <Link
//                     href={'/auth/login'}
//                     className="text-sm font-semibold text-primary"
//                 >
//                     Sign In
//                 </Link>
//             </div>
//         </div>
//     );
// }
