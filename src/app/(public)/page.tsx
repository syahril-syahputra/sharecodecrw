// pages/index.tsx
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Head from 'next/head';

interface LatLng {
    lat: number;
    lng: number;
}

interface AddressObject {
    [key: string]: string;
}

const Map = dynamic(() => import('@/components/base/Maps/maps'), {
    ssr: false,
});

const Home: React.FC = () => {
    const [location, setLocation] = useState<LatLng | null>(null);
    const [address, setAddress] = useState<string>('');

    const handleLocationSelected = async (latlng: LatLng) => {
        setLocation(latlng);
        const { lat, lng } = latlng;
        console.log(lat, lng);

        const iframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;
        console.log(iframeUrl);

        // Reverse geocoding
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name;
        const address_obj: AddressObject = data.address;
        setAddress(address);
        console.log({ address_obj });
    };

    return (
        <div>
            <Map onLocationSelected={handleLocationSelected} />
            <Head>
                <title>OpenStreetMap with Next.js</title>
            </Head>
            <h1>OpenStreetMap with Next.js</h1>
            {location && (
                <div>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lng}</p>
                    <p>Address: {address}</p>
                    <p>
                        Map URL:{' '}
                        <a
                            href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}`}
                        >
                            Open in OpenStreetMap
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;
