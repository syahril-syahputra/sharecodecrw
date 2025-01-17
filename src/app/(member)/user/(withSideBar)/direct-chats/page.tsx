'use client';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import LastChat from '@/components/base/Chat/LastChat';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import { MessagesSquareIcon } from 'lucide-react';
import React, { Fragment } from 'react';

export default function Page() {
    return (
        <div className="flex-1 px-6">
            {false && <LoadingPage />}

            {!false && (
                <Fragment>
                    <CardDarkNeonGlow>
                        <div className="mb-5 flex justify-between">
                            <h1 className="flex space-x-2 text-4xl">
                                <MessagesSquareIcon size={35} />
                                <p>Chats</p>
                            </h1>
                        </div>
                        <div className="space-y-4">
                            <LastChat
                                picture_url="https://github.com/shadcn.png"
                                name="Kadek Cahya"
                                message="Haleluya"
                                createdAt="2025-01-10 10:10:10"
                                isRead={false}
                            />
                            <LastChat
                                picture_url="https://github.com/sha"
                                name="Kadek Cahya"
                                message="Haleluya"
                                createdAt="2025-01-10 10:10:10"
                                isRead={false}
                            />
                        </div>
                    </CardDarkNeonGlow>
                </Fragment>
            )}
        </div>
    );
}
