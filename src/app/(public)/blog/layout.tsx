import React from 'react';

export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="container  py-4 ">{children}</div>;
}
