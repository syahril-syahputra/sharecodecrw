export interface IReport {
    entityId: string;
    entityType: 'crowners' | 'question_answers' | 'commercial_listings';
    entitySubType?: 'events' | 'communities' | 'community-tutors' | null;
}
