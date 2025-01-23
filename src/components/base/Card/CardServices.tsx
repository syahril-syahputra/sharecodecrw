import { Card } from '@/components/ui/card';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Rating from '@/components/ui/rating';
import { Radius, ShieldCheck, UserCheck } from 'lucide-react';
import { IServices } from '@/types/services';

interface IProps {
    data: IServices;
}
export default function CardServices(props: IProps) {
    if (props.data.is_boost_color) {
        return (
            <Card className="relative overflow-hidden rounded-lg !border-none bg-[#E9E1D3] p-6 ">
                <div className="flex items-center space-x-4 font-bold capitalize">
                    <Avatar>
                        <AvatarImage
                            src={props.data.cmp_image_url || ''}
                            alt={props.data.title}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0">
                        <div className="flex items-center space-x-2 font-light">
                            <span>{props.data.cmp_name}</span>

                            {props.data.is_company ? (
                                <ShieldCheck />
                            ) : (
                                <UserCheck />
                            )}
                        </div>
                        <Rating
                            star={props.data.rating || 0}
                            rater={props.data.total_reviews}
                        />
                    </div>
                </div>

                <div className=" justify-between space-y-8 py-8">
                    <div className="relative flex-1 ">
                        <h2 className="mb-4 text-3xl font-bold">
                            {props.data.title}
                        </h2>
                        <p className="bg-gradient-to-b from-gray-900 to-transparent bg-clip-text  text-transparent">
                            {props.data.description}
                        </p>
                    </div>

                    <Image
                        src={props.data.image_url}
                        width={100}
                        height={100}
                        alt="picture"
                        className=" h-96 w-full rounded-2xl"
                    />
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2 px-4 ">
                        <Radius />
                        <span>
                            {parseFloat(props.data.distance.toFixed(2))} KM
                        </span>
                    </div>
                    <div className="flex flex-1 flex-col text-right">
                        <span className="text-2xl font-bold">
                            ${props.data.price}
                        </span>{' '}
                        <span className="text-base">
                            {props.data.payment_type}
                        </span>
                    </div>
                </div>
            </Card>
        );
    }
    return (
        <Card className="relative overflow-hidden rounded-lg bg-gray-900 p-6 text-white shadow-lg">
            <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
            {/* {JSON.stringify(props.data)} */}
            <div className="flex items-center space-x-4 font-bold capitalize">
                <Avatar>
                    <AvatarImage
                        src={props.data.cmp_image_url || ''}
                        alt={props.data.title}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-0">
                    <div className="space-y-0">
                        <div className="flex items-center space-x-2 font-light">
                            <span>{props.data.cmp_name}</span>

                            {props.data.is_company ? (
                                <ShieldCheck />
                            ) : (
                                <UserCheck />
                            )}
                        </div>
                        <Rating
                            star={props.data.rating || 0}
                            rater={props.data.total_reviews}
                        />
                    </div>
                    <Rating
                        star={props.data.rating || 0}
                        rater={props.data.total_reviews}
                    />
                </div>
            </div>

            <div className="flex justify-between space-x-8 py-8">
                <div className="relative flex-1 text-white">
                    <h2 className="mb-4 text-3xl font-bold">
                        {props.data.title}
                    </h2>
                    <p className="bg-gradient-to-b from-gray-200 to-transparent bg-clip-text text-transparent">
                        {props.data.description}
                    </p>
                </div>

                <Image
                    src={props.data.image_url}
                    width={100}
                    height={100}
                    alt="picture"
                    className="h-48 w-48 rounded-2xl"
                />
            </div>
            <div className="flex justify-between">
                <div className="flex items-center space-x-2 px-4 text-gray-200">
                    <Radius />
                    <span>{parseFloat(props.data.distance.toFixed(2))} KM</span>
                </div>
                <div className="flex flex-1 flex-col text-right">
                    <span className="text-2xl font-bold">
                        ${props.data.price}
                    </span>{' '}
                    <span className="text-base">{props.data.payment_type}</span>
                </div>
            </div>
        </Card>
    );
}
