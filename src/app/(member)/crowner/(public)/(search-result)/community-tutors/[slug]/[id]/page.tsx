'use client';
import { useParams } from 'next/navigation';

export default function Page() {
    const { id } = useParams();
    console.log(id);
    return <>Detail with slug</>;
}
