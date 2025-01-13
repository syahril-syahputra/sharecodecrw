import Image from 'next/image';
import React from 'react';

export default function Logo() {
    return <Image src={'/logo.svg'} width={70} height={70} alt={'logo'} />;
}
