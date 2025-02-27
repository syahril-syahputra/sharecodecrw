import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return <div className="container py-4 ">{children}</div>;
}
