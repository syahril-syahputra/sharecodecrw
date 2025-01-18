import React from 'react';
import CardServices from '../Card/CardServices';

export default function HomeServices() {
    return (
        <div className="container grid grid-cols-2 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <CardServices key={index} />
            ))}
        </div>
    );
}
