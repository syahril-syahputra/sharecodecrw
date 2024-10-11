import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { IProfile, IUpdatePassword, IUpdateProfile } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useUpdateProfilePhoto = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (img: FileList) => {
            const formData = new FormData();
            formData.append('profile_picture', img[0]);
            const response = fetchClient({
                method: 'PATCH',
                url: '/user/profile-picture',
                contentType: 'multipart/form-data',
                body: formData,
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

export const useUpdateInterest = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (interests: string[]) => {
            const response = fetchClient({
                method: 'PUT',
                url: '/user/interest',
                body: { interests },
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

export const useUpdateEmail = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (email: string) => {
            const response = fetchClient({
                method: 'PATCH',
                url: '/user/email',
                body: { email },
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};
export const useUpdatePhoneNumber = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (phone_number: string) => {
            const response = fetchClient({
                method: 'PATCH',
                url: '/user/phone-number',
                body: { phone_number },
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

export const useUpdatePasswrod = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (data: IUpdatePassword) => {
            const response = fetchClient({
                method: 'PATCH',
                url: '/user/password',
                body: data,
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};
export const useUpdateProfile = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (data: IUpdateProfile) => {
            const response = fetchClient({
                method: 'PATCH',
                url: '/user/profile',
                body: data,
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};
export const useFetchProfile = (onSuccess: (data: IProfile) => void) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetchClient({
                url: '/user/me',
            });

            return response.data.data as IProfile;
        },
        onSuccess: onSuccess,
    });
};

//for tab event

import { IPaginationMeta, ISortMeta } from '@/types/base/pagination';
import { IDetailEvent } from '@/types/events';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { IDetailCommunity } from '@/types/community';
import { ICommunityTutor } from '@/types/crowner/community-tutors';
import { IInterestFavorites } from '@/types/interestsFavorites';

export const useFetchProfileEvent = (
    id: string,
    page: PaginationState,
    sort: ISortMeta
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/user/profile/${id}/events`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IDetailEvent[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.profile.event', page, sort],
        placeholderData: keepPreviousData,
    });
};

export const useFetchProfileCommunities = (
    id: string,
    page: PaginationState,
    sort: ISortMeta
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/user/profile/${id}/communities`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IDetailCommunity[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.profile.communities', page, sort],
        placeholderData: keepPreviousData,
    });
};

export const useFetchProfileCommunitiyTutors = (
    id: string,
    page: PaginationState,
    sort: ISortMeta
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/user/profile/${id}/community-tutors`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: ICommunityTutor[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.profile.communitytutors', page, sort],
        placeholderData: keepPreviousData,
    });
};

export const useFetchProfileInterest = (
    id: string,
    page: PaginationState,
    sort: ISortMeta
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/user/profile/${id}/interests`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IInterestFavorites[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.profile.interest', page, sort],
        placeholderData: keepPreviousData,
    });
};
