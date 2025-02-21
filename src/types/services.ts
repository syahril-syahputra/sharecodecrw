/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFilterServices {
    title?: string;
    service_id?: string;
    province_id?: string;
    city_id?: string;
    rad?: string;
    lat?: any;
    lng?: any;
    provider: '' | 'company' | 'personal';
}
export interface IServices {
    id: string;
    business_id: string;
    title: string;
    slug: string;
    image_url: string;
    city: string;
    province: string;
    distance: number;
    description: string;
    price: string;
    payment_type: string;
    cmp_name: string;
    cmp_image_url: string;
    rating: number | null;
    total_reviews: number;
    is_company: boolean;
    color_hexadecimal: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boosters: any[];
    is_boost_color: boolean;
    is_boost_size: boolean;
}
