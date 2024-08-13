export interface IChat {
    event:
        | 'parse-error'
        | 'validation-error'
        | 'chat-group-user-join'
        | 'chat-group-user-left'
        | 'chat-group-user-receive-message'
        | 'chat-group-user-send-message';
    message?: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        user_id?: string;
        name?: string;
        id?: string;
        message?: string;
        created_at?: string;
        profile_picture_url: string;
    };
}
