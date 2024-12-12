export interface ICommercialListings {
    id: string;
    title: string;
    slug: string;
    image_url: string;
    city?: string;
    province?: string;
    service_name?: string;
}

export interface ICommercialListing {
    id: string;
    title: string;
    slug: string;
    city: string;
    province: string;
    image_url: string;
    latitude: number;
    longitude: number;
    description: string;
    commercial_name: string;
    commercial_image_url?: string;
    service_name: string;
    about: string;
}

export interface IFilterCommercialListing {
    title?: string;
    city_id?: string;
    province_id?: string;
    lat?: string;
    lng?: string;
    rad?: string;
    service_id?: string;
}
