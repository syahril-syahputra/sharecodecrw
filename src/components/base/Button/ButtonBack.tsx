import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ButtonBack() {
    const navigate = useRouter();
    return (
        <Button
            className="mb-4 pl-0"
            variant={'ghost'}
            onClick={() => navigate.back()}
        >
            <ChevronLeft /> Back
        </Button>
    );
}
