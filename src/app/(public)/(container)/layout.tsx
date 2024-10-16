import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return <div className="container mt-20 py-4 ">{children}</div>;
}
