'use client';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import DialogChangeBusinessAdditionalDocument from '@/components/base/Dialog/DialogChangeBusinessAdditionalDocument';
import DialogChangeBusinessLicense from '@/components/base/Dialog/DialogChangeBusinessLicense';
import DialogChangeBusinessPicture from '@/components/base/Dialog/DialogChangeBusinessPicture';
import DialogChangePhoneNumber from '@/components/base/Dialog/DialogChangePhoneNumber';
import DialogChangeUserEmail from '@/components/base/Dialog/DialogChangeUserEmail';
import DialogVerifyPhoneNumber from '@/components/base/Dialog/DialogVerifyPhoneNumber';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import IframeMap from '@/components/base/Maps/IframeMap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useFetchBusiness } from '@/feature/business/useFetchBusiness';
import { emptyValueCheck } from '@/lib/utils';
import {
    BookMarked,
    CheckCircle,
    Contact,
    Eye,
    File,
    HardDriveUpload,
    Mail,
    MapPin,
    MinusCircle,
    PenLine,
    Phone,
    ShieldCheck,
    Star,
    Upload,
    User,
    UserCheck,
} from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';

export default function Page() {
    const { data: business, isLoading, refetch } = useFetchBusiness();
    const initialUserName = business?.name ? business?.name.charAt(0) : '';

    const [dialogChangeBusinessPicture, setDialogChangeBusinessPicture] =
        useState(false);
    const [dialogChangeBusinessLicense, setDialogChangeBusinessLicense] =
        useState(false);
    const [dialogChangeAdditionalDocument, setDialogChangeAdditionalDocument] =
        useState(false);
    const [dialogChangeEmail, setDialogChangeEmail] = useState(false);
    return (
        <div className="flex-1 px-6">
            {isLoading && <LoadingPage />}

            {!isLoading && (
                <div className="space-y-4">
                    <CardDarkNeonGlow>
                        <div className="flex justify-between">
                            <h1 className="flex space-x-2 text-3xl">
                                <p>
                                    <span className="italic">
                                        Welcome back,
                                    </span>{' '}
                                    {business?.name}!
                                </p>
                            </h1>
                        </div>
                    </CardDarkNeonGlow>
                    <CardDarkNeonGlow>
                        <div className="space-y-10 px-4 pb-20">
                            <div className="flex justify-between">
                                <div className="flex space-x-4">
                                    <div className="my-auto mb-2">
                                        <div className="relative inline-block cursor-pointer">
                                            <Avatar className="mb-2 h-24 w-24">
                                                <AvatarImage
                                                    src={business?.image_url}
                                                    alt={business?.name}
                                                />
                                                <AvatarFallback>
                                                    {initialUserName}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                onClick={() =>
                                                    setDialogChangeBusinessPicture(
                                                        true
                                                    )
                                                }
                                                className="absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center rounded-full bg-neutral-800 bg-opacity-60 opacity-0 transition duration-100 hover:opacity-100"
                                            >
                                                <HardDriveUpload
                                                    className="text-white"
                                                    size={20}
                                                />
                                            </div>
                                            <DialogChangeBusinessPicture
                                                imageUrl={business?.image_url}
                                                isOpen={
                                                    dialogChangeBusinessPicture
                                                }
                                                onOpenChange={(value) =>
                                                    setDialogChangeBusinessPicture(
                                                        value
                                                    )
                                                }
                                                refetch={refetch}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex space-x-4">
                                            <p className="text-3xl font-semibold">
                                                {business?.name}
                                            </p>
                                            <div className="mt-2">
                                                {business?.is_company ? (
                                                    <div className="flex space-x-2">
                                                        <ShieldCheck />
                                                        <span>Company</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2">
                                                        <UserCheck />
                                                        <span>Individual</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            {business?.total_reviews == 0 ? (
                                                <span className="text-lg italic text-muted-foreground">
                                                    No review
                                                </span>
                                            ) : (
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <Fragment
                                                                key={star}
                                                            >
                                                                {star <=
                                                                    (business?.rating ??
                                                                        0) && (
                                                                    <Star
                                                                        fill="#3b82f6"
                                                                        strokeWidth={
                                                                            0
                                                                        }
                                                                    />
                                                                )}
                                                                {star >
                                                                    (business?.rating ??
                                                                        0) && (
                                                                    <Star
                                                                        fill="gray"
                                                                        strokeWidth={
                                                                            0
                                                                        }
                                                                    />
                                                                )}
                                                            </Fragment>
                                                        )
                                                    )}
                                                    <span className="ml-2 text-muted-foreground">
                                                        {
                                                            business?.total_reviews
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Link href={'/user/edit'}>
                                    <Button className="rounded-xl bg-blue-500">
                                        <PenLine className="mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                            {/* about */}
                            <div className="space-y-5">
                                {business?.username && (
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <User size={25} />
                                            <span className="text-2xl font-semibold">
                                                Username
                                            </span>
                                        </div>
                                        <span className="font-thin">
                                            {business?.username}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <BookMarked size={25} />
                                        <span className="text-2xl font-semibold">
                                            About
                                        </span>
                                    </div>
                                    <span className="font-thin">
                                        {emptyValueCheck(
                                            business?.about ?? '',
                                            <span className="italic text-muted-foreground">
                                                no about given
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Contact size={25} />
                                        <span className="text-2xl font-semibold">
                                            Contact
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2  text-white">
                                        <Phone size={15} />

                                        <span className="text-md">
                                            {emptyValueCheck(
                                                business?.phone_number ?? '',
                                                <div className="flex space-x-2 ">
                                                    <span className="items-center font-thin italic text-muted-foreground">
                                                        no phone number given
                                                    </span>
                                                    <DialogChangePhoneNumber
                                                        refetch={refetch}
                                                    />
                                                </div>
                                            )}
                                        </span>
                                        {business?.phone_number_verified_at && (
                                            <span className="text-md flex items-center rounded-full bg-gray-700 px-2">
                                                verified
                                                <CheckCircle
                                                    size={18}
                                                    className="ml-2 text-blue-500"
                                                />
                                            </span>
                                        )}
                                        {business?.phone_number &&
                                            !business?.phone_number_verified_at && (
                                                <DialogVerifyPhoneNumber
                                                    userPhoneNumber={
                                                        business?.phone_number ??
                                                        ''
                                                    }
                                                    refetch={refetch}
                                                />
                                            )}
                                    </div>
                                    <div className="flex items-center space-x-2 font-thin text-white">
                                        <Mail size={15} />
                                        <span className="text-md">
                                            {business?.email}
                                        </span>
                                        {business?.email_verified_at ? (
                                            <div className="flex space-x-2">
                                                <span className="text-md flex items-center rounded-full bg-gray-700 px-2">
                                                    verified
                                                    <CheckCircle
                                                        size={18}
                                                        className="ml-2 text-blue-500"
                                                    />
                                                </span>
                                                <span
                                                    onClick={() =>
                                                        setDialogChangeEmail(
                                                            true
                                                        )
                                                    }
                                                    className="text-md flex cursor-pointer items-center rounded-full bg-gray-700 px-2 transition duration-100 hover:bg-gray-800"
                                                >
                                                    change email
                                                </span>
                                                <DialogChangeUserEmail
                                                    currentEmail={
                                                        business.email
                                                    }
                                                    isOpen={dialogChangeEmail}
                                                    onOpenChange={(value) =>
                                                        setDialogChangeEmail(
                                                            value
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-md flex cursor-pointer items-center rounded-full bg-gray-700 px-2 transition duration-100 hover:bg-gray-800">
                                                verify email
                                                <MinusCircle
                                                    size={18}
                                                    className="ml-2 text-gray-900"
                                                />
                                            </span>
                                        )}
                                    </div>
                                    <div className="items-top flex space-x-2 font-thin text-white">
                                        <div>
                                            <MapPin
                                                size={15}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p className="text-md">
                                                {business?.city},{' '}
                                                {business?.province}
                                            </p>
                                            <p className="text-md">
                                                {business?.address}
                                            </p>
                                            <div>
                                                <IframeMap
                                                    latitude={
                                                        business?.latitude
                                                    }
                                                    longitude={
                                                        business?.longitude
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {business?.is_company && (
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <File size={25} />
                                            <span className="text-2xl font-semibold">
                                                Document
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <div className="grid w-full grid-cols-2 gap-2 lg:w-6/12">
                                                <div className="rounded-xl bg-gray-700 p-10">
                                                    <span className="flex justify-center text-center">
                                                        Business License
                                                    </span>
                                                    <div className="mt-2 flex justify-center space-x-2">
                                                        <Link
                                                            href={
                                                                business?.license_url ??
                                                                ''
                                                            }
                                                            target="_blank"
                                                        >
                                                            <Button
                                                                size={'sm'}
                                                                variant={
                                                                    'ghost'
                                                                }
                                                            >
                                                                <Eye
                                                                    size={18}
                                                                />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            onClick={() =>
                                                                setDialogChangeBusinessLicense(
                                                                    true
                                                                )
                                                            }
                                                            size={'sm'}
                                                            variant={'ghost'}
                                                        >
                                                            <Upload size={18} />
                                                        </Button>
                                                        <DialogChangeBusinessLicense
                                                            isOpen={
                                                                dialogChangeBusinessLicense
                                                            }
                                                            onOpenChange={(
                                                                value
                                                            ) =>
                                                                setDialogChangeBusinessLicense(
                                                                    value
                                                                )
                                                            }
                                                            refetch={refetch}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="rounded-xl bg-gray-700 p-10">
                                                    <span className="flex justify-center text-center">
                                                        Vocational License
                                                    </span>
                                                    <div className="mt-2 flex justify-center space-x-2">
                                                        <Link
                                                            href={
                                                                business?.document_url ??
                                                                ''
                                                            }
                                                            target="_blank"
                                                        >
                                                            <Button
                                                                size={'sm'}
                                                                variant={
                                                                    'ghost'
                                                                }
                                                            >
                                                                <Eye
                                                                    size={18}
                                                                />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            onClick={() =>
                                                                setDialogChangeAdditionalDocument(
                                                                    true
                                                                )
                                                            }
                                                            size={'sm'}
                                                            variant={'ghost'}
                                                        >
                                                            <Upload size={18} />
                                                        </Button>
                                                        <DialogChangeBusinessAdditionalDocument
                                                            isOpen={
                                                                dialogChangeAdditionalDocument
                                                            }
                                                            onOpenChange={(
                                                                value
                                                            ) =>
                                                                setDialogChangeAdditionalDocument(
                                                                    value
                                                                )
                                                            }
                                                            refetch={refetch}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardDarkNeonGlow>
                </div>
            )}
        </div>
    );
}
