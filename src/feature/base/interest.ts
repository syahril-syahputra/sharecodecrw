import { Option } from '@/components/ui/multipleSelector';
import fetchClient from '@/lib/FetchClient';
import { IInterest, IItemInterest } from '@/types/base/interest';
import { useQuery } from '@tanstack/react-query';

export const useFetchInterest = (onSuccess: (data: IInterest[]) => void) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/tags',
            });
            onSuccess(response.data.data as IInterest[]);
            return response.data.data as IInterest[];
        },
        queryKey: ['fetch.interest'],
        refetchOnWindowFocus: false,
    });
};
export const useFetchInterestFilter = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/tags',
            });
            const options: IInterest[] = response.data.data;
            const dataChild: Option[] = [];
            options.map((item) => {
                item.children.forEach((itemChild: IItemInterest) => {
                    dataChild.push({
                        label: itemChild.title,
                        value: itemChild.id,
                        group: item.title,
                    });
                });
            });

            return dataChild;
        },
        queryKey: ['fetch.interestGroup'],
        refetchOnWindowFocus: false,
    });
};
