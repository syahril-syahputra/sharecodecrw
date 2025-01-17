'use client';
import CardChat from '@/components/base/Card/Chat/CardChat';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import CardHistoryChat from '@/components/base/Card//Chat/CardHistoryChat';
import { Button } from '@/components/ui/button';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchHistoryChat } from '@/feature/chat/useFetchHistoryChat';
import fetchClient from '@/lib/FetchClient';
import useTableConfig from '@/lib/useTableConfig';
import { IChat, IDirectChat } from '@/types/chat';
import clsx from 'clsx';
import React, { Fragment, KeyboardEvent, useEffect, useRef, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState('');
    const first = useRef<HTMLDivElement>(null);
    const [dataChat, setdataChat] = useState<IDirectChat[]>([]);
    const [init, setinit] = useState(false);
    const { pagination } = useTableConfig({
        pageSize: 5,
        defaultFilter: {},
    });
    useEffect(() => {
        ping();
    }, []);

    let timeoutId: NodeJS.Timeout;
    const ping = () => {
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(
            () => {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(
                        JSON.stringify({
                            event: 'ping',
                        })
                    );
                }
                ping();
            },
            parseInt(process.env.NEXT_PUBLIC_INTERVAL_PING || '5000')
        );
    };
    const {
        data: historyChat,
        fetchNextPage,
        isLoading,
        hasNextPage,
    } = useFetchHistoryChat(params.id, pagination, () => {
        setTimeout(() => {
            if (!init) {
                first.current?.scrollIntoView(false);
                setinit(true);
            }
        }, 100);
    });
    const getToken = async () => {
        try {
            const data = await fetchClient({
                url: '/ephemeral-tokens',
            });

            connect(
                `wss://dev-api.crowner.ca/ws?token=${data.data.data.access_token}&room_id=${params.id}`
            );
        } catch (error) {
            console.log(error);
        }
    };
    function connect(url: string) {
        const ws = new WebSocket(url);
        ws.onopen = function () {
            // subscribe to some channels
            console.log('connetion success open');
            ping();
        };

        ws.onmessage = function (e) {
            setdataChat((prev) => [JSON.parse(e.data), ...prev]);
            if (
                JSON.parse(e.data).event !== 'pong' &&
                JSON.parse(e.data).event !== 'ping'
            ) {
                setTimeout(() => {
                    first.current?.scrollIntoView(false);
                }, 100);
            }
        };

        ws.onclose = function (e) {
            console.log(
                'Socket is closed. Reconnect will be attempted in 10 second.',
                e.reason
            );
            setTimeout(function () {
                getToken();
            }, 10000);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ws.onerror = function (err: any) {
            console.error('Socket encountered error: ', err, 'Closing socket');
            ws.close();
        };
        setSocket(ws);
    }
    useEffect(() => {
        getToken();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [params.id]);

    const handleSendMessage = () => {
        if (message.length > 0) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                ping();
                socket.send(
                    JSON.stringify({
                        event: 'chat-direct-user-send-message',
                        data: {
                            message: message,
                        },
                    })
                );
                setMessage(''); // Clear the input after sending the message
            } else {
                getToken();
                console.log('Socket is not open.');
            }
        }
    };
    const handleType = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };
    return (
        <Fragment>
            <div className="flex-1 px-6">
                <CardDarkNeonGlow>
                    <div className="rounded-md">
                        <ScrollArea className="h-[700px]">
                            <div
                                className="flex min-h-[700px] flex-col-reverse"
                                ref={first}
                            >
                                {dataChat.map((item, index) => (
                                    <CardChat key={index} data={item} />
                                ))}
                                {historyChat &&
                                    historyChat.pages.map((page, index) => (
                                        <div key={index}>
                                            {page.items.map((item, i) => (
                                                <CardHistoryChat key={i} data={item} />
                                            ))}
                                        </div>
                                    ))}
                                <div className='space-y-2 mt-2'>
                                    <CardChat data={{
                                        event:'chat-direct-user-receive-message',
                                        message: 'huhuhu',
                                    }} />
                                    <CardChat data={{
                                        event:'chat-direct-user-receive-message',
                                        message: 'huhuhu',
                                    }} />
                                </div>

                                <div className='space-y-2'>
                                    <CardHistoryChat data={{
                                        user_id: 'yes',
                                        first_name: 'string',
                                        last_name: 'string',
                                        id: 'string',
                                        message: 'flex items-center justify-between rounded-lg bg-white/10 p-4 shadow-lg backdrop-blur-md',
                                        created_at: '2025-01-01 20:00:23',
                                        profile_picture_url: 'string',
                                        
                                    }} />

                                    <CardHistoryChat data={{
                                        user_id: 'true',
                                        first_name: 'string',
                                        last_name: 'string',
                                        id: 'string',
                                        message: 'flex items-center justify-between rounded-lg bg-white/10 p-4 shadow-lg backdrop-blur-md',
                                        created_at: '2025-01-01 20:00:23',
                                        profile_picture_url: 'string',
                                        
                                    }} />

                                    <CardHistoryChat data={{
                                        user_id: 'true',
                                        first_name: 'string',
                                        last_name: 'string',
                                        id: 'string',
                                        message: 'flex tween-white/10 p-4 shadow-lg backdrop-blur-md',
                                        created_at: '2025-01-01 20:00:23',
                                        profile_picture_url: 'string',
                                        
                                    }} />

                                    <CardHistoryChat data={{
                                        user_id: 'yes',
                                        first_name: 'string',
                                        last_name: 'string',
                                        id: 'string',
                                        message: 'flex tween-white/10 p-4 shadow-lg backdrop-blur-md',
                                        created_at: '2025-01-01 20:00:23',
                                        profile_picture_url: 'string',
                                        
                                    }} />

                                    <CardHistoryChat data={{
                                        user_id: 'yes',
                                        first_name: 'string',
                                        last_name: 'string',
                                        id: 'string',
                                        message: 'flex tween-wdow-lg backdrop-blur-md',
                                        created_at: '2025-01-01 20:00:23',
                                        profile_picture_url: 'string',
                                        
                                    }} />
                                </div>

                                <InfiniteScroll
                                    hasMore={hasNextPage}
                                    isLoading={isLoading}
                                    reverse
                                    next={() => {
                                        fetchNextPage();
                                    }}
                                    threshold={0}
                                >
                                    {hasNextPage && (
                                        <div className="border-Input mt-[1000px] flex items-center justify-between space-x-2 border-b px-4  ">
                                            <Skeleton className="aspect-square h-14 rounded-full" />
                                            <div className="flex-1 space-y-1">
                                                <Skeleton className="h-6 w-full" />
                                                <Skeleton className="h-4 w-full" />
                                            </div>
                                        </div>
                                    )}
                                </InfiniteScroll>
                            </div>
                        </ScrollArea>
                        <div className="flex items-center space-x-2 pt-5">
                            <div className="flex flex-1 items-center space-x-2">
                                <div
                                    className={clsx(
                                        socket?.readyState === WebSocket.OPEN
                                            ? 'bg-green-500'
                                            : socket?.readyState ===
                                                WebSocket.CONNECTING
                                            ? 'bg-yellow-400'
                                            : 'bg-red-500',
                                        'aspect-square animate-pulse rounded-full  p-2'
                                    )}
                                ></div>

                                <Input
                                    placeholder="Insert message here..."
                                    className="flex-1 text-black
                                    !outline-none !ring-0"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleType}
                                />
                            </div>
                            <Button onClick={handleSendMessage}>Send</Button>
                        </div>
                    </div>
                </CardDarkNeonGlow>
            </div>
        </Fragment>
    );
}
