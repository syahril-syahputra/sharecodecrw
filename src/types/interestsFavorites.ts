export interface IInterestFavorites {
    id: string;
    province_id: string;
    city_id: string;
    listing_type: string;
    listing_type_formatted: string;
    city: string;
    province: string;
    title: string;
    slug?: string;
    image_url: string | null;
}
