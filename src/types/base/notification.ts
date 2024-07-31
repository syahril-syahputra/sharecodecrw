export interface INotification {
    id: string;
    title: string;
    message: string;
    created_at: string;
    is_read: boolean;
    listing_type: string;
    listing_type_formatted: string;
    entity_id: number;
    entity_type: string;
    entity_type_formatted: string;
    entity_image_url: string;
    user_id: number;
    first_name: string;
    last_name: string;
    profile_picture_url: string;
}
