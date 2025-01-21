'use client';
import Spinner from "@/components/ui/spinner";
import { useCheckPaymentStatus } from "@/feature/payments/useCheckPaymentStatus";
import { Check, X } from "lucide-react";

export default function Page({ params }: { params: { id: string } }) {
    const { isPending, isError } = useCheckPaymentStatus(params.id!);

    if (isPending) {
        return (
            <div className="mx-auto flex flex-col justify-center items-center py-10 space-y-4">
                <Spinner />
                <div className="font-bold  text-lg text-primary">
                    Please Wait
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto flex flex-col justify-center items-center space-y-2">
                <div className="flex rounded-full p-2 bg-red-600 shadow-lg shadow-green-100">
                    <X className="text-white" size={40} />
                </div>
                <h1 className="text-center text-4xl font-bold text-primary">
                    Payment Not Found
                </h1>
            </div>
        );
    }

    return (
        <div className="mx-auto flex flex-col justify-center items-center space-y-2">
            <div className="flex rounded-full p-2 bg-green-600 shadow-lg shadow-green-100">
                <Check className="text-white" size={40} />
            </div>
            <h1 className="text-center text-4xl font-bold text-primary">
                Payment Success
            </h1>
        </div>
    );
}
