'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Page() {
    const { data: session } = useSession();
    console.log('session', session);
    return <div>{JSON.stringify(session)}</div>;
}
