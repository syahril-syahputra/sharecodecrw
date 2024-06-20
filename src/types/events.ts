export interface BodyCreateEvent {
    title: string;
    timezone_id: string;
    latitude: number;
    longitude: number;
    about?: string;
    date_time: Date;
    price?: number;
    img: FileList;
    tags: string[];
    city_id: string;
    address: string;
}
