import Image from 'next/image';
import React from 'react';

export default function Logo() {
    return <Image src={'/logo.svg'} width={100} height={100} alt={'logo'} />;
}
