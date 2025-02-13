import fetchClient from '@/lib/FetchClient';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface IResult {
    items: {
        name: string;
        price: string; // Price as string
        credits: string; // Credits as string
    }[];
    tax_percentage: string; // Tax percentage as string
    total_price: string; // Total price as string
    tax_amount: string; // Tax amount as string
    total_payment: string; // Total payment as string
    credit_balance: string; // Credit balance as string
    total_credits: string; // Total credits as string
    is_sufficient: boolean; // Sufficient flag as boolean
    shortfall: string; // Shortfall as string
}
export const useCalculatePricing = (
    duration: string,
    is_premium?: boolean,
    is_color?: boolean,
    is_uplifter?: boolean
) => {
    return useQuery({
        queryFn: async () => {
            const url = `/businesses/publisher/listing-calculations`;
            const booster = [];
            if (is_premium) booster.push('premium');
            if (is_color) booster.push('color');
            if (is_uplifter) booster.push('uplifter');
            const response = await fetchClient({
                url: url,
                method: 'POST',
                body: {
                    duration: parseInt(duration),
                    boosters: booster,
                },
            });

            return response.data.data as IResult;
        },
        queryKey: ['fetch.price', duration, is_premium, is_uplifter, is_color],
        placeholderData: keepPreviousData,
        enabled: !!duration
    });
};
