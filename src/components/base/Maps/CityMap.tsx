// components/Map.tsx
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { LatLng } from '@/types/maps';

interface LocationMarkerProps {
    userLocation: LatLng | null;
}

interface MapProps {
    className?: string;
    location?: LatLng;
}

// Fix marker icons issue with Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const LocationMarker: React.FC<LocationMarkerProps> = ({ userLocation }) => {
    const [position, setPosition] = useState<LatLng | null>(userLocation);

    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng);

            map.setView(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        // alert(JSON.stringify(userLocation));
        if (userLocation) {
            map.setView(userLocation, map.getZoom());
            setPosition(userLocation);
        }
    }, [userLocation, map]);

    return position === null ? null : (
        <Marker draggable={false} position={position}></Marker>
    );
};

const Map: React.FC<MapProps> = ({ className, location }) => {
    const [zoom] = useState<number>(7);
    const defaultLat = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT || '0');
    const defaultLng = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LNG || '0');
    const [userLocation, setUserLocation] = useState<LatLng | null>(
        location || {
            lat: defaultLat,
            lng: defaultLng,
        }
    );

    // reset position of marker
    useEffect(() => {
        setUserLocation({
            lat: location?.lat || defaultLat,
            lng: location?.lng || defaultLng,
        });
    }, [location]);

    if (!location || location.lat === 0 || location.lng === 0) {
        return false;
    }
    return (
        <MapContainer
            center={userLocation || { lat: defaultLat, lng: defaultLng }}
            zoom={zoom}
            className={className}
        >
            <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker userLocation={userLocation} />
        </MapContainer>
    );
};

export default Map;
