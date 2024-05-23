export interface BodyUserRegistration {
    first_name: string; // required
    last_name: string; // required
    email: string; // required
    password: string; // required
    password_confirmation: string; // required
    dob: Date; // required, should be a valid date string
    city_id: string; // required
    subscribe_newsletter: boolean; // required
}
