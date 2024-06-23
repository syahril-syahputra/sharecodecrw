import { UseFormReturn } from 'react-hook-form';
import { Fragment, useEffect, useState } from 'react';
import OpenStreetMap, { LatLng } from './OpenStreetMap';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface IProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any | undefined>;
    lat: number | undefined;
    lng: number | undefined;
    isFetching: boolean;
    address: string | undefined;
}

export default function MapForm(props: IProps) {
    // maps
    const handleLocationSelected = async (latlng: LatLng) => {
        const { lat, lng } = latlng;

        // set to form
        props.form.setValue('latitude', lat);
        props.form.setValue('longitude', lng);

        // Reverse geocoding
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name;
        props.form.setValue('address', String(address));
    };

    const [eventBaseLocation, setEventBaseLocation] = useState<LatLng | null>(
        null
    );
    const resetPosition = () => {
        //reset value
        props.form.setValue('latitude', Number(props?.lat) || 0);
        props.form.setValue('longitude', Number(props?.lng) || 0);
        props.form.setValue('address', props?.address || '');
        setEventBaseLocation({
            lat: Number(props?.lat),
            lng: Number(props?.lng),
        });
    };
    useEffect(() => {
        setEventBaseLocation({
            lat: Number(props?.lat),
            lng: Number(props?.lng),
        });
    }, [props.isFetching]);

    return (
        <Fragment>
            <div className="space-z-2 z-0">
                {!props.isFetching && (
                    <OpenStreetMap
                        onLocationSelected={handleLocationSelected}
                        userLocationBase={eventBaseLocation}
                    />
                )}
            </div>
            <FormField
                control={props.form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button
                className="mt-2"
                variant={'secondary'}
                onClick={resetPosition}
            >
                Reset map position
            </Button>
        </Fragment>
    );
}
