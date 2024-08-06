export interface INotification {
    id: string;
    title: string;
    message: string;
    link: string;
    is_read: boolean;
    entity_id: string;
    entity_type: string;
    entity_picture_url: string;
    notifier_user_id: string;
    notifier_first_name: string;
    notifier_last_name: string;
    notifier_profile_picture_url: string | null;
    created_at: string;
}
