export interface BodyUserRegistration {
    first_name: string; // required
    last_name: string; // required
    username: string; // required
    email: string; // required
    password: string; // required
    password_confirmation: string; // required
    city_id: string; // required    
}

export interface BodyCompanyRegistration {
    company_name: string; // required
    email: string; // required
    address: string; // required
    password: string; // required
    password_confirmation: string; // required
    business_license_name?: string; // required base 64
    business_license: string; // required base 64
    city_id: string; // required    
}