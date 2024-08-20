'use client';
import CardChat from '@/components/base/Card/CardChat';
import CardHistoryChat from '@/components/base/Card/CardHistoryChat';
import { Button } from '@/components/ui/button';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchHistoryChat } from '@/feature/chat/useFetchHistoryChat';
import fetchClient from '@/lib/FetchClient';
import useTableConfig from '@/lib/useTableConfig';
import { IChat } from '@/types/chat';
import clsx from 'clsx';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState('');
    const first = useRef<HTMLDivElement>(null);
    const [dataChat, setdataChat] = useState<IChat[]>([]);
    const [init, setinit] = useState(false);
    const { pagination } = useTableConfig({
        pageSize: 10,
        defaultFilter: {},
    });
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
                url: '/aphemeral-tokens',
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
        };

        ws.onmessage = function (e) {
            setdataChat((prev) => [...prev, JSON.parse(e.data)]);

            setTimeout(() => {
                first.current?.scrollIntoView(false);
            }, 100);
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
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                    event: 'chat-group-user-send-message',
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
    };
    const handleType = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };
    return (
        <div className="flex-1 p-4">
            <div className=" border-Border rounded-md border bg-input">
                <ScrollArea className=" h-[500px] ">
                    <div
                        className="flex min-h-[500px] flex-col justify-end "
                        ref={first}
                    >
                        <InfiniteScroll
                            hasMore={hasNextPage}
                            isLoading={isLoading}
                            next={() => fetchNextPage()}
                            threshold={1}
                        >
                            {hasNextPage && (
                                <div className="border-Input flex items-center justify-between space-x-2 border-b px-4 py-4 ">
                                    <Skeleton className="aspect-square h-14 rounded-full" />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            )}
                        </InfiniteScroll>
                        {historyChat &&
                            historyChat.pages.map((page) =>
                                page.items.map((item, i) => (
                                    <CardHistoryChat key={i} data={item} />
                                ))
                            )}

                        {dataChat.map((item, index) => (
                            <CardChat key={index} data={item} />
                        ))}
                    </div>
                </ScrollArea>
                <div className="flex items-center space-x-2 p-4">
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
                            className="flex-1
                            !outline-none !ring-0"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleType}
                        />
                    </div>
                    <Button onClick={handleSendMessage}>Send</Button>
                </div>
            </div>
        </div>
    );
}
