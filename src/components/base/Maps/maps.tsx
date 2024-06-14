// components/Map.tsx
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

interface LatLng {
    lat: number;
    lng: number;
}

interface LocationMarkerProps {
    onLocationSelected: (latlng: LatLng) => void;
    userLocation: LatLng | null;
}

interface MapProps {
    onLocationSelected: (latlng: LatLng) => void;
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

const LocationMarker: React.FC<LocationMarkerProps> = ({
    onLocationSelected,
    userLocation,
}) => {
    const [position, setPosition] = useState<LatLng | null>(userLocation);

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelected(e.latlng);
        },
        locationfound(e) {
            setPosition(e.latlng);
            onLocationSelected(e.latlng);
            map.setView(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (userLocation) {
            map.setView(userLocation, map.getZoom());
            setPosition(userLocation);
        }
    }, [userLocation, map]);

    return position === null ? null : <Marker position={position}></Marker>;
};

const Map: React.FC<MapProps> = ({ onLocationSelected }) => {
    const [zoom] = useState<number>(13);
    const [userLocation, setUserLocation] = useState<LatLng | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            });
        }
    }, []);

    return (
        <MapContainer
            center={userLocation || { lat: 51.505, lng: 60.0 }}
            zoom={zoom}
            style={{ height: '200px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
                onLocationSelected={onLocationSelected}
                userLocation={userLocation}
            />
        </MapContainer>
    );
};

export default Map;
