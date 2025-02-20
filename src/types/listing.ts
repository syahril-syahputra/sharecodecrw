export interface BodyCreateListing {
    title: string;
    price: number;
    payment_type: string; // Bisa diganti dengan enum jika ada daftar tetap untuk jenis pembayaran
    description: string;
    city_id: string;
    latitude: number;
    longitude: number;
    service_id: string;
    service_other?: string;
    duration: number;
    color_hexadecimal?: string;
    address?: string;
    is_direct: boolean;
    hashtags: string[]; // Array of strings
    boosters: string[]; // Array of strings
    image: string; // Base64 string
}
export interface BodyUpdateListing {
    title: string;
    price: number;
    payment_type: string; // Bisa diganti dengan enum jika ada daftar tetap untuk jenis pembayaran
    description: string;
    city_id: string;
    service_id: string;
    address?: string;
    service_other?: string;
    latitude: number;
    longitude: number;
    hashtags: string[]; // Array of strings
    image?: string; // Base64 string
}
export interface bodyCalculatePrice {
    duration: number;
    boosters: string[];
}
export type typeAcceptanceStatus =
    | ''
    | 'created'
    | 'awaiting_approval'
    | 'published'
    | 'rejected'
    | 'expired';

export interface ICreateListring {
    title: string;
    description: string;
    city_id: string;
    latitude: number;
    longitude: number;
    image?: string;
    is_direct?: boolean;
    duration?: number;
}
export interface IListing {
    id: string;
    title: string;
    price: number;
    payment_type: string; // Can be replaced with an enum if values are predefined
    city: string;
    province: string;
    acceptance_status: string; // Can be replaced with an enum if values are predefined
    image_url: string;
    created_at: string; // ISO date string
    end_date: string | null; // Use Date if you plan to parse it into a Date object
}

export interface IListingFilter {
    acceptance_status: typeAcceptanceStatus;
    title: string;
}
export interface IDuration {
    id: string; // Unique identifier for the plan
    name: string; // Name of the publish plan
    price: number; // Price of the plan
    credits: number; // Number of credits provided
    duration: number; // Duration of the plan in months
}

export interface IListingHistoryItem {
    status: string;
    description: string;
    created_at: string;
}
export interface IListingInterest {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string;
}

export interface IDetailListing {
    id: string;
    city_id: string;
    province_id: string;
    city: string;
    province: string;
    cmp_name: string; // Company name
    title: string;
    price: string; // Price as string
    payment_type: string; // Can be replaced with enum if there are fixed options
    payment_type_formatted: string;
    description: string;
    image_url: string;
    acceptance_status: typeAcceptanceStatus; // Can be replaced with enum if there are fixed options
    latitude: number;
    address?: string;
    longitude: number;
    interest_counter: number;
    duration: number | null; // Duration can be null
    start_date: string | null; // Start date as string or null
    end_date: string | null; // End date as string or null
    hashtags: string[];
    service_id: string;
    service_name: string;
    service_other?: string;
}
export interface BodyRepublishListing {
    duration: number;
    is_direct: boolean;
    boosters: string[];
    color_hexadecimal?: string;
}
