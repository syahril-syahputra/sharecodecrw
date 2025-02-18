export interface IBusinessListing {
    id: string;
    title: string;
    slug: string;
    price: string;
    payment_type: string;
    distance: number;
    latitude: number;
    longitude: number;
    image_url: string;
    description: string;
    cmp_id: string;
    cmp_name: string;
    cmp_image_url: string;
    cmp_about: string;
    service_name: string;
    phone: string;
    email: string;
    address: string;
    rating: number;
    city: string;
    province: string;
    total_reviews: number;
    is_company: boolean;
    user_id: string;
}
