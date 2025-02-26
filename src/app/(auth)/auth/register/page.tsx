'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import React, { useState } from 'react';
import Link from 'next/link';
import CompanyRegistration from './Company';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IndividuRegistration from './Individual';
import { ArrowLeftCircle, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

// // dark
export default function Page() {
    const router = useRouter();
    const [tab, setTab] = useState('individual');

    const onTabChange = (value: string) => {
        setTab(value);
        console.log(value);
    };

    return (
        <div className="relative mx-auto max-w-xl space-y-8 overflow-hidden rounded-xl bg-gray-900 p-10">
            {tab == 'individual' ? (
                <div className="absolute -right-80 -top-64 h-96 w-full -translate-x-1/2 transform rounded-full bg-primary opacity-30 blur-3xl"></div>
            ) : (
                <div className="absolute -right-80 -top-64 h-96 w-full -translate-x-1/2 transform rounded-full bg-accent opacity-30 blur-3xl"></div>
            )}
            <div className="relative">
                <div className="mb-6 flex items-center space-x-2">
                    <Link href={'/'}>
                        <ArrowLeftCircle
                            className="cursor-pointer text-white"
                            size={28}
                            onClick={() => router.push('/auth/login')}
                        />
                    </Link>
                    <TitleAuth className="!text-4xl !text-white underline">
                        Sign Up
                    </TitleAuth>
                </div>
                <div className="">
                    <Tabs
                        value={tab}
                        onValueChange={onTabChange}
                        defaultValue="individual"
                        className="w-full"
                    >
                        <TabsList className="mb-4 grid w-full grid-cols-2 bg-transparent text-white">
                            <TabsTrigger
                                className="space-x-2 !rounded-sm"
                                value="individual"
                            >
                                <User size={18} />
                                <span>Individual</span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="space-x-2 !rounded-sm"
                                value="company"
                            >
                                <Users size={18} />
                                <span>Company</span>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="individual">
                            <IndividuRegistration />
                        </TabsContent>
                        <TabsContent value="company">
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
