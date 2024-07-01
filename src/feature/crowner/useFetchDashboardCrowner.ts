import fetchClient from '@/lib/FetchClient';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchDashboardCrowner = (
    events: number,
    communities: number,
    community_events: number,
    community_tutors: number
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/dashboard`;
            const queryParams = new URLSearchParams({
                events: events.toString(),
                communities: communities.toString(),
                community_events: community_events.toString(),
                community_tutors: community_tutors.toString(),
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data;
        },
        queryKey: ['fetch.dashboardPublisher'],
        placeholderData: keepPreviousData,
    });
};
