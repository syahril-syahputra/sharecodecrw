'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './ThemeProvider';
import Providers from './providers';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ILocation } from '@/types/base/location';
import fetchClient from '@/lib/FetchClient';
import DialogLocation from '@/components/base/Dialog/DialogLocation';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [userLocation, setUserLocation] = useState<ILocation>({
        lat: parseFloat(
            process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_LAT || '0'
        ),
        lng: parseFloat(
            process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_LNG || '0'
        ),
        province: process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_PROVINCE || '',
        city: process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_CITY || '',
    });
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
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Providers>
                        <SessionProvider>
                            <div>
                                {userLocation && (
                                    <div>
                                        <h2>User Location</h2>
                                        <p>Latitude: {userLocation.lat}</p>
                                        <p>Longitude: {userLocation.lng}</p>
                                        <p>City: {userLocation.city}</p>
                                        <p>Province: {userLocation.province}</p>
                                    </div>
                                )}
                                <DialogLocation
                                    open={open}
                                    setOpen={(value) => setOpen(value)}
                                    setUserLocation={(location) =>
                                        setUserLocation(location)
                                    }
                                />
                                {/* {children} */}
                            </div>
                        </SessionProvider>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
