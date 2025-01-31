import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ImageCard from '../Image/ImageCard';
import { IServices } from '@/types/services';
import { ShieldCheck, UserCheck } from 'lucide-react';
import Rating from '@/components/ui/rating';

export default function CardService({
    data,
    variant = 'mini',
}: {
    data: IServices
    variant?: 'mini' | 'full'
}) {

    if(variant == 'mini') {
        return (
            <div className="relative h-60 w-96 overflow-hidden rounded-lg bg-gray-800 shadow-lg">
                <ImageCard src={data.image_url} className="h-full w-full object-cover" />

                <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-8">
                    <div className="">
                        <h3 className="text-2xl font-bold text-white">{data.title}</h3>
                        <div className="-space-y-1">
                            <span className="font-semibold text-white">
                                ${data.price}
                            </span>
                            /
                            <span className="font-light text-white font-urbanist">
                                {data.payment_type}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if(variant == 'full') {
        return (
            <div className="relative h-60 w-96 overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                <ImageCard src={data.image_url} className="h-full w-full object-cover" />

                <div className="absolute inset-0 flex space-x-2 bg-black bg-opacity-20 p-7">
                    <Avatar>
                        <AvatarImage
                            src={data.cmp_image_url || ''}
                            alt={data.title}
                        />
                        <AvatarFallback>{123}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2 font-urbanist text-white">
                            <span>{data.cmp_name}</span>
                            {data.is_company ? (
                                <ShieldCheck />
                            ) : (
                                <UserCheck />
                            )}
                        </div>
                        <Rating
                            star={data.rating || 0}
                            rater={data.total_reviews}
                        />
                    </div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-20 p-7">
                    <div className="">
                        <h3 className="text-xl font-bold text-white">{data.title}</h3>
                        <div className="-space-y-1">
                            <span className="text-white text-lg">
                                ${data.price}
                            </span>
                            <span className='text-white'>{' '}</span>
                            <span className="font-light text-white text-sm">
                                {data.payment_type}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
