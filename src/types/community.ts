import { ITag } from './events';
export interface BodyCreateCommunity {
    title: string;
    latitude: number;
    longitude: number;
    about?: string;
    img: FileList;
    address: string;
    tags: string[];
    city_id: string;
}

export interface ICommunity {
    id: string;
    title: string;
    city: string;
    province: string;
    acceptance_status: string;
    is_visible: boolean;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface IDetailCommunity {
    id: string;
    title: string;
    slug: string;
    city_id: string;
    province_id: string;
    city: string;
    province: string;
    address: string;
    latitude: number;
    longitude: number;
    host_name: string;
    host_id: string;
    host_picture_url: string;
    about: string;
    acceptance_status: string;
    is_visible: boolean;
    image_url: string;
    follower_counter: number;
    created_at: string;
    updated_at: string;
    tags: ITag[];
}

export interface IUpdateCommunity {
    title: string;
    city_id: string;
    province_id?: string;
    address: string;
    latitude: number;
    longitude: number;
    about: string;
    image?: FileList;

    //crowner_tags
    tags: string[] | undefined;
}

export interface IFilterCommunity {
    title: string;
    acceptance_status: string;
    is_visible: string;
}
export interface IFilterSubscriberCommunities {
    title?: string;
    province_id?: string;
    city_id?: string;
    tag_ids?: string;
    lat?: string;
    lng?: string;
    rad?: string;
}

export interface ICommunityFollower {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string;
}

export interface ICommunityAcceptanceStatus {
    acceptance_status: 'accepted' | 'rejected' | undefined;
}

export interface ICommunityVisibility {
    visibility: boolean;
}
