// Data object containing all collections
export interface IDataLanding {
    events: IEventLanding[];
    communities: ICommunityLanding[];
    community_tutors: ICommunityTutorLanding[];
    commercials: ICommercialLanding[]; // Empty array, but still defining for future use
}

// Event interface
export interface IEventLanding {
    id: string;
    title: string;
    slug: string;
    city: string;
    province: string;
    date_time: string; // ISO DateTime format (e.g., "2024-10-31 12:00:00")
    timezone_identifier: string; // Timezone name (e.g., "America/Winnipeg")
    gmt_offset: string; // GMT offset (e.g., "GMT -05:00")
    image_url: string;
}

// Community interface
export interface ICommunityLanding {
    id: string;
    title: string;
    slug: string;
    city: string;
    province: string;
    image_url: string;
}

// Community Tutor interface
export interface ICommunityTutorLanding {
    id: string;
    title: string;
    slug: string;
    city: string;
    province: string;
    image_url: string;
}

// Commercials interface (currently empty)
export interface ICommercialLanding {}
