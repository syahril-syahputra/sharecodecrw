import Image from 'next/image';
import Link from 'next/link';

interface IProps {
    id: string;
    image: string;
    title: string;
    hourly_rate: number;
    hourly_rate_formatted: string;
    region: string;
    is_visible: boolean;
    acceptance_status: string;
}

export default function CardCommunityTutor(props: IProps) {
    return (
        <div className="space-y-5">
            <Link href={`/crowner/community-tutors/${props.id}`} key={props.id}>
                <div className="flex cursor-pointer rounded-md border shadow-md active:opacity-30">
                    <div className="mx-auto my-auto h-full">
                        <Image
                            alt="image"
                            src={props.image || '/icons/image.png'}
                            className="h-40 w-64 rounded-l-md object-cover"
                            width={108}
                            height={200}
                        />
                    </div>
                    <div className="flex h-auto flex-1 pl-4">
                        <div className="mt-2">
                            <div className="text-lg font-semibold">
                                {props.title}
                            </div>
                            <div className="text-muted-foreground">
                                {props.region}
                            </div>
                            <div className="mt-6">
                                {props.hourly_rate > 0 && (
                                    <>
                                        <span className="text-primary">
                                            {props.hourly_rate_formatted}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {' '}
                                            / hour
                                        </span>
                                    </>
                                )}
                                {props.hourly_rate == 0 && (
                                    <span className="font-semibold text-primary">
                                        {props.hourly_rate_formatted}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm">
                                {props.is_visible ? 'visible' : 'hidden'} -{' '}
                                {props.acceptance_status}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
