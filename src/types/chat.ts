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

export interface IDirectChat {
    event:
        | 'parse-error'
        | 'validation-error'
        | 'chat-direct-user-receive-message'
        | 'chat-direct-user-send-message';
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

export interface IChatHistory {
    user_id?: string;
    first_name?: string;
    last_name?: string;
    id?: string;
    message?: string;
    created_at?: string;
    profile_picture_url: string;
}
