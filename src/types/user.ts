export interface User {
    email: string;
    company_name: string;
    id: number;
    ulid: string;
    first_name: string;
    last_name: string;
    email_verified_at: string;
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
