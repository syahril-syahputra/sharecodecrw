export interface IItemInterest {
    id: string;
    title: string;
}
export interface IInterest {
    id: string;
    title: string;
    children: IItemInterest[];
}
