export interface IArticle {
    id: string;
    categoryId: string;
    category: string;
    title: string;
    creator: string;
    createdAt: string;
}
export interface IFilterArticle {
    category?: string;
    title?: string;
}
