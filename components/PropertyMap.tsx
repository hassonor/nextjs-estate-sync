'use client';

import dynamic from 'next/dynamic';
import useGeocode from '@/hooks/useGeocode';
import 'leaflet/dist/leaflet.css';

// Import marker images for Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import {IProperty} from "@/interfaces/property.interface";

// Dynamic imports for Leaflet components, which will be client-side only
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {ssr: false});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {ssr: false});
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {ssr: false});
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {ssr: false});

// Set default Leaflet marker icons
if (typeof window !== 'undefined') {
    const L = require('leaflet');
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIconRetina.src,
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
    });
}


const PropertyMap: React.FC<{ property: IProperty }> = ({property}) => {
    const {position, viewport, loading, geocodeError} = useGeocode(property);

    // Don't render the map until client-side and geocode data is fetched
    if (loading) return <h3>Loading...</h3>;
    if (geocodeError) return <div className="text-xl">No location data found</div>;

    return (
        typeof window !== 'undefined' && position ? (
            <MapContainer
                center={position || [viewport.latitude, viewport.longitude]}
                zoom={viewport.zoom}
                style={{height: viewport.height, width: viewport.width}}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        {property.location.street}, {property.location.city}
                    </Popup>
                </Marker>
            </MapContainer>
        ) : null
    );
};

export default PropertyMap;
