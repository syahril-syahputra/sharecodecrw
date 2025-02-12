export interface User {
    email: string;
    company_name: string;
    id: number;
    ulid: string;
    first_name: string;
    last_name: string;
    email_verified_at: string;
}
export interface IOtherUser {
    id: string;
    user_id: string;
    cmp_name: string;
    about?: string;
    address?: string;
    phone_number?: string;
    email?: string;
    image_url?: string;
    latitude?: null;
    longitude?: null;
    is_company: false;
    rating: null;
    total_reviews: 0;
    province?: string | null;
    city?: string | null;
    service_name?: string;
}
export interface ITags {
    id: string;
    title: string;
}
export interface IProfile {
    id?: string;
    city_id?: string;
    province_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    email_verified_at?: string; // Can be Date if you want to parse it to a Date object
    subscribe_newsletter?: boolean;
    dob?: string; // Can be Date if you want to parse it to a Date object
    phone_number?: string | null;
    phone_number_verified_at?: string | null; // Can be Date if you want to parse it to a Date object
    city?: string;
    province?: string;
    about?: string | null;
    created_at?: string; // Can be Date if you want to parse it to a Date object
    profile_picture_url?: string;
    tags?: ITags[];
}
export interface IUpdateProfile {
    first_name: string;
    last_name: string;
    dob: string;
    subscribe_newsletter: boolean;
    city_id: string;
    about: string;
}
export interface IUpdatePassword {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}

export interface IBusiness {
    city_id: string;
    province_id: string;
    service_id?: string;
    service_name?: string;
    is_service_accepted?: boolean;
    is_company: boolean;
    city: string;
    province: string;
    name: string;
    first_name: string;
    last_name: string;
    username?: string;
    address: string;
    about: string;
    phone_number: string;
    phone_number_verified_at: string;
    image_url?: string;
    license_url?: string;
    document_url?: string;
    latitude: number;
    longitude: number;
    rating?: number;
    total_reviews: number;
    email: string;
    email_verified_at: string;
}

export interface IBusinessUpdate {
    city_id: string;
    service_id?: string;
    service_other?: string;
    name?: string;
    first_name?: string | null;
    last_name?: string | null;
    username?: string | null;
    address: string;
    phone_number: string;
    latitude: number;
    longitude: number;
    about: string;
}
