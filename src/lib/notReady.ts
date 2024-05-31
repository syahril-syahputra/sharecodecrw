import { toast } from 'sonner';

export default function notReady() {
    toast('Event has been created', {
        description: 'Sunday, December 03, 2023 at 9:00 AM',
        action: {
            label: 'Close',
            onClick: () => console.log('Close'),
        },
    });
}
