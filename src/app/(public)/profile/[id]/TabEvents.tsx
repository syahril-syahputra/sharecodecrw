import CardEvent from '@/components/base/Card/CardEvent';
import { IDetailEvent } from '@/types/events';
import React from 'react';

export default function TabEvents() {
    const events: IDetailEvent[] = [
        {
            id: '1',
            city_id: 'CITY_ID_1',
            slug: 'slug-1',
            province_id: 'PROVINCE_ID_1',
            timezone_id: 'TIMEZONE_ID_1',
            community_id: null,
            title: 'Event Title 1',
            city: 'City Name 1',
            province: 'Province Name 1',
            tz_identifier: 'GMT+7',
            gmt_offset: '+7',
            community_name: 'Community Name 1',
            address: 'Address 1',
            latitude: 123.456,
            longitude: -45.6789,
            about: 'About Event 1',
            acceptance_status: 'ACCEPTED',
            is_visible: true,
            image_url: '',
            created_at: '2023-02-20T14:30:00Z',
            updated_at: '2023-03-01T12:00:00Z',
            date_time: '2023-02-25T18:00:00Z',
            rsvp_counter: 10,
            interest_counter: 5,
            price: 'Free',
            price_formatted: '$0.00',
            tags: [],
        },
        {
            id: '2',
            city_id: 'CITY_ID_2',
            slug: 'null',
            province_id: 'PROVINCE_ID_2',
            timezone_id: 'TIMEZONE_ID_2',
            community_id: 'COMMUNITY_ID_2',
            title: 'Event Title 2',
            city: 'City Name 2',
            province: 'Province Name 2',
            tz_identifier: 'GMT+8',
            gmt_offset: '+8',
            community_name: 'Community Name 2',
            address: 'Address 2',
            latitude: 12.3456,
            longitude: -45.6789,
            about: 'About Event 2',
            acceptance_status: 'DECLINED',
            is_visible: false,
            image_url: '',
            created_at: '2023-03-01T10:00:00Z',
            updated_at: '2023-03-15T12:00:00Z',
            date_time: '2023-04-01T14:30:00Z',
            rsvp_counter: 20,
            interest_counter: 10,
            price: '$50.00',
            price_formatted: '$50.00',
            tags: [],
        },
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
