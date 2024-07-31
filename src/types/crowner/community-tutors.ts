import { IItemInterest } from '../base/interest';

export interface BodyCreateCommunityTutor {
    city_id: string;
    title: string;
    address: string;
    latitude: number;
    longitude: number;
    about?: string;
    image?: FileList;
    tags: string[];
    hourly_rate?: number;
}

export interface ICommunityTutor {
    id: string;
    city_id: string;
    slug?: string;
    province_id: string;
    city: string;
    province: string;
    title: string;
    address: string;
    latitude: number;
    longitude: number;
    about: string;
    acceptance_status: string;
    is_visible: boolean;
    image_url: string;
    hourly_rate: number;
    hourly_rate_formatted: string;
    interest_counter: number;
    tags: IItemInterest[];
    created_at: string;
    updated_at: string;
}

export interface IFilterCommunityTutor {
    title: string;
    acceptance_status: string;
    is_visible: string;
}
export interface IFilterSubscriberCommunityTutor {
    title?: string;
    province_id?: string;
    city_id?: string;
    tag_ids?: string;
    lat?: string;
    lng?: string;
    rad?: string;
    hourly_rate_min?: string;
    hourly_rate_max?: string;
}

export interface ICommunityTutorInterest {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string;
}

export interface ICommunityTutorVisibility {
    visibility: boolean;
}
