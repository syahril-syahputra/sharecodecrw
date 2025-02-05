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
        | 'direct-message-sent'
        | 'direct-message-received';
    message?: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        business_id: string;
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

export interface IConversationRoom {
    id: string;
    business_id: string;
    name: string;
    image_url: string;
    last_message: string;
    is_read: boolean;
    unread_count: number;
    last_message_created_at: string;
}

export interface IConversationDetail {
    id: string;
    logged_in_business_id: string;
    chat_partner_business_id: string;
    chat_partner_business_name: string;
    chat_partner_business_image_url: string;
}
