import { ITags } from './user';

export interface IArticle {
    id: string;
    categoryId: string;
    category: string;
    image_url?: string;
    title: string;
    creator: string;
    createdAt: string;
    body: string;
    tags: ITags[];
    creator_picture_url?: string;
}
export interface IFilterArticle {
    category_id?: string;
    title?: string;
    tags?: string;
}
