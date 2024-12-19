export interface IQuestion {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    profile_picture_url: string | null;
    message: string;
    answer_counter: number;
    is_author: boolean;
    created_at: string;
    updated_at: string;
}
export interface IAnswer {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    profile_picture_url: string | null;
    message: string;
    is_author: boolean;
    created_at: string;
    updated_at: string;
}
