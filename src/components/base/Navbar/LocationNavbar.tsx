'use client';
import { useEffect, useState } from 'react';
import { ILocation } from '@/types/base/location';
import fetchClient from '@/lib/FetchClient';
import DialogLocation from '@/components/base/Dialog/DialogLocation';
import { MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LocationNavbar() {
    const [open, setOpen] = useState(false);
    const [userLocation, setUserLocation] = useState<ILocation | null>(null);
    useEffect(() => {
        const location = localStorage.getItem('location');

        if (location) {
            setUserLocation(JSON.parse(location) as ILocation);
        } else {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        getProvinceAndCity(latitude, longitude);
                    },
                    () => {
                        setOpen(true);
                    }
                );
            } else {
                console.log('Geolocation is not available in your browser.');
            }
        }
    }, []);

    const getProvinceAndCity = async (latitude: number, longitude: number) => {
        const response = await fetchClient({
            url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        });
        const result = {
            lat: latitude,
            lng: longitude,
            province: response.data.address.state,
            city: response.data.address.city,
        } as ILocation;
        setUserLocation(result);
        localStorage.setItem('location', JSON.stringify(result));
    };
    return (
        <div className="flex items-center  pl-4  text-sm">
            <DialogLocation
                open={open}
                setOpen={(value) => setOpen(value)}
                setUserLocation={(location) => setUserLocation(location)}
            />

            {userLocation ? (
                <span className="flex items-center space-x-2 font-semibold">
                    <MapPin size={18} className="text-primary" />
                    <span>
                        {userLocation.city}, {userLocation.province}
                    </span>
                </span>
            ) : (
                <div className="flex space-x-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                </div>
            )}
        </div>
    );
}
