'use client';
import { Card } from '@/components/ui/card';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Rating from '@/components/ui/rating';
import { Radius, ShieldCheck, UserCheck } from 'lucide-react';
import { IServices } from '@/types/services';
import Link from 'next/link';
import { truncateText } from '@/lib/utils';
import clsx from 'clsx';

interface IProps {
    data: IServices;
}
export default function CardServices(props: IProps) {
    const initialUserName = props.data.cmp_name
        ? props.data.cmp_name.charAt(0)
        : '';

    if (props.data.is_boost_size) {
        return (
            <Link href={`/service/${props.data.slug}/${props.data.id}`}>
                <Card
                    className={clsx(
                        `relative overflow-hidden rounded-lg p-10 text-white shadow-lg`
                    )}
                    style={{ backgroundColor: props.data.color_hexadecimal }}
                >
                    <div className="absolute -top-64 left-80 h-96 w-96 -translate-x-1/2 transform rounded-full bg-[#E9E1D3] opacity-35 blur-3xl"></div>
                    <div className="flex items-center space-x-4 font-bold capitalize">
                        <Avatar>
                            <AvatarImage
                                src={props.data.cmp_image_url || ''}
                                alt={props.data.title}
                            />
                            <AvatarFallback>{initialUserName}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2 font-urbanist font-light">
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

                    <div className="justify-between space-y-8 py-5">
                        <div className="relative flex-1 text-white">
                            <h2 className="mb-3 font-saans text-3xl font-bold">
                                {props.data.title}
                            </h2>
                            <p className="bg-gradient-to-b from-gray-200 to-transparent bg-clip-text font-urbanist text-transparent">
                                {truncateText(props.data.description, 250)}
                            </p>
                        </div>

                        <Image
                            src={props.data.image_url}
                            width={500}
                            height={500}
                            alt="picture"
                            className="mx-auto max-h-64 w-full rounded-2xl object-cover"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-2 font-saans font-bold text-gray-400">
                            <Radius />
                            <span>
                                {parseFloat(props.data.distance.toFixed(2))} KM
                            </span>
                        </div>
                        <div className="flex flex-1 flex-col text-right font-saans">
                            <span className="text-2xl font-bold">
                                ${props.data.price}
                            </span>{' '}
                            <span className="-mt-2 font-urbanist text-base">
                                {props.data.payment_type}
                            </span>
                        </div>
                    </div>
                </Card>
            </Link>
        );
    }
    return (
        <Link href={`/service/${props.data.slug}/${props.data.id}`}>
            <Card
                className={clsx(
                    `relative overflow-hidden rounded-lg p-10 text-white shadow-lg`,
                    props.data.is_boost_color
                        ? `bg-[${props.data.color_hexadecimal}]`
                        : 'bg-gray-950'
                )}
            >
                <div className="absolute -top-64 left-80 h-96 w-96 -translate-x-1/2 transform rounded-full bg-[#E9E1D3] opacity-35 blur-3xl"></div>
                <div className="flex items-center space-x-4 font-bold capitalize">
                    <Avatar>
                        <AvatarImage
                            src={props.data.cmp_image_url || ''}
                            alt={props.data.title}
                        />
                        <AvatarFallback>{initialUserName}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2 font-urbanist font-light">
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

                <div className="flex justify-between space-x-10 py-5">
                    <div className="relative flex-1 text-white">
                        <h2 className="mb-3 font-saans text-3xl font-bold">
                            {props.data.title}
                        </h2>
                        <p className="bg-gradient-to-b from-gray-200 to-transparent bg-clip-text font-urbanist text-transparent">
                            {truncateText(props.data.description, 250)}
                        </p>
                    </div>

                    <Image
                        src={props.data.image_url}
                        width={100}
                        height={100}
                        alt="picture"
                        className="h-48 w-40 rounded-2xl object-cover"
                    />
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2 font-saans font-bold text-gray-400">
                        <Radius />
                        <span>
                            {parseFloat(props.data.distance.toFixed(2))} KM
                        </span>
                    </div>
                    <div className="flex flex-1 flex-col text-right">
                        <span className="font-saans text-2xl font-bold">
                            ${props.data.price}
                        </span>{' '}
                        <span className="-mt-2 font-urbanist text-base">
                            {props.data.payment_type}
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
