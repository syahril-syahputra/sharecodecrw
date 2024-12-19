import { EyeOff } from 'lucide-react';

export default function VisibilityStatus({
    is_visible,
    acceptance,
}: {
    is_visible: boolean | undefined;
    acceptance: string | undefined;
}) {
    if (!is_visible && acceptance == 'accepted') {
        return (
            <span className="inline-flex text-slate-500">
                <EyeOff color="grey" className="my-auto mr-1" size={20} />
                Hidden
            </span>
        );
    }
    return;
}
