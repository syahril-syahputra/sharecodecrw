import CardEvent from '@/components/base/Card/CardEvent';
import { IDetailEvent } from '@/types/events';
import React from 'react';

export default function TabEvents() {
    const events: IDetailEvent[] = [
    ];
    return (
        <div>
            {events.map((item) => (
                <CardEvent
                    isPublic
                    variant="horizontal"
                    key={item.id}
                    data={item}
                />
            ))}
        </div>
    );
}
