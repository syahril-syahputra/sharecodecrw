export default interface IEventReservation {
    id: string;
    city_id: string;
    province_id: string;
    city: string;
    province: string;
    slug?: string;
    title: string;
    date_time: string;
    tz_identifier: string;
    gmt_offset: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}
