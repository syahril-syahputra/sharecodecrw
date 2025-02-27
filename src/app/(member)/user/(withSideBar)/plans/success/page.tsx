'use client';
import Spinner from '@/components/ui/spinner';
import { useRefreshCreditBusiness } from '@/feature/business/useFetchCreditBusiness';
import { useCheckPaymentStatus } from '@/feature/payments/useCheckPaymentStatus';
import { Check, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    const { isPending, isError, isSuccess } = useCheckPaymentStatus(
        session_id!
    );
    useEffect(() => {
        if (isSuccess) {
            refreshCredit();
        }
    }, [isSuccess]);
    const { mutate: refreshCredit } = useRefreshCreditBusiness({
        onSuccess: async () => {},
        onError: () => {},
    });

    if (isPending) {
        return (
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 py-10">
                <Spinner />
                <div className="text-lg  font-bold text-primary">
                    Please Wait
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto flex flex-col items-center justify-center space-y-2">
                <div className="flex rounded-full bg-red-600 p-2 shadow-lg shadow-green-100">
                    <X className="text-white" size={40} />
                </div>
                <h1 className="text-center text-4xl font-bold text-primary">
                    Payment Not Found
                </h1>
            </div>
        );
    }

    return (
        <div className="mx-auto flex flex-col items-center justify-center space-y-2">
            <div className="flex rounded-full bg-green-600 p-2 shadow-lg shadow-green-100">
                <Check className="text-white" size={40} />
            </div>
            <h1 className="text-center text-4xl font-bold text-primary">
                Payment Success
            </h1>
        </div>
    );
}
