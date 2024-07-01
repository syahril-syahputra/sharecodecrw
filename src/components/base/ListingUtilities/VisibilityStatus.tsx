import { EyeIcon, EyeOff } from 'lucide-react';

export default function VisibilityStatus({
    is_visible,
}: {
    is_visible: boolean | undefined;
}) {
    switch (is_visible) {
        case true:
            return (
                <span className="inline-flex text-blue-500">
                    <EyeIcon color="blue" className="my-auto mr-1" size={20} />
                    Visible
                </span>
            );
            break;
        case false:
            return (
                <span className="inline-flex text-slate-500">
                    <EyeOff color="grey" className="my-auto mr-1" size={20} />
                    Hidden
                </span>
            );
            break;
        default:
            return <>Undefined Status</>;
    }
}
