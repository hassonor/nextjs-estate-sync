import {useEffect, useState} from 'react';
import {fromAddress, OutputFormat, setDefaults} from 'react-geocode';

interface Property {
    location: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
    };
}

interface Viewport {
    latitude: number;
    longitude: number;
    zoom: number;
    width: string;
    height: string;
}

const useGeocode = (property: Property) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [geocodeError, setGeocodeError] = useState<boolean>(false);
    const [viewport, setViewport] = useState<Viewport>({
        latitude: 0,
        longitude: 0,
        zoom: 16,
        width: '100%',
        height: '500px',
    });

    useEffect(() => {
        setDefaults({
            outputFormat: OutputFormat.JSON,
            key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || '',
            language: 'en',
            region: 'il',
        });

        const fetchCoords = async () => {
            try {
                const res = await fromAddress(
                    `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
                );

                if (res.results.length === 0) {
                    setGeocodeError(true);
                    return;
                }

                const {lat, lng} = res.results[0].geometry.location;
                setPosition([lat, lng]); // Set position for the marker
                setViewport((prevViewport) => ({
                    ...prevViewport,
                    latitude: lat,
                    longitude: lng,
                }));
            } catch (error) {
                console.error(error);
                setGeocodeError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCoords();
    }, [property]);

    return {position, viewport, loading, geocodeError};
};

export default useGeocode;
