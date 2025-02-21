import Image from 'next/image';
import React from 'react';

export default function Logo() {
    return <Image src={'/logo.svg'} width={120} height={120} alt={'logo'} />;
}
