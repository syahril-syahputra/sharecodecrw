export interface BodyCreateEvent {
    title: string;
    timezone_id: string;
    latitude: number;
    longitude: number;
    about?: string;
    date_time: Date;
    price?: number;
    img: FileList;
    tags: string[];
    city_id: string;
    address: string;
    community_id?: string;
}

export interface ITag {
    id: string;
    title: string;
}

export interface IDetailEvent {
    id: string;
    city_id: string;
    province_id: string;
    timezone_id: string;
    community_id: string | null;
    title: string;
    city: string;
    province: string;
    tz_identifier: string;
    gmt_offset: string;
    community_name: string | null;
    address: string;
    latitude: number;
    longitude: number;
    about: string;
    acceptance_status: string;
    is_visible: boolean;
    image_url: string;
    created_at: string;
    updated_at: string;
    date_time: string;
    rsvp_counter: number;
    interest_counter: number;
    price: string;
    price_formatted: string;
    tags: ITag[];
}

export interface IFilterEvent {
    community_id?: string;
    title?: string;
    timezone_id?: string;
    start_date?: string;
    end_date?: string;
    event_type?: string;
    event_schedule?: string;
    acceptance_status?: string;
    is_visible?: string;
}

export interface IFilterSubscriberEvent {
    sort_by: string;
    price_min?: string;
    price_max?: string;
    start_date?: string;
    end_date?: string;
    event_type?: string;
    title?: string;
    province_id?: string;
    city_id?: string;
    timezone_id?: string;
    community_id?: string;
    tag_ids?: string;
}

export interface IEventRsvp {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string;
}
export interface IEventInterest {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string;
}
export interface IEventAcceptanceStatus {
    acceptance_status: 'accepted' | 'rejected' | undefined;
}
export interface IEventVisibility {
    visibility: boolean;
}
