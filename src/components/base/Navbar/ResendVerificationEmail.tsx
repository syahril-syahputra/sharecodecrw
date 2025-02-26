import React from 'react';
import Link from 'next/link';

export default function ResendVerificationEmail() {
    return (
        <div className="bg-red-600 text-white dark:bg-red-600 dark:text-white">
            <div className="container py-2 text-center font-bold">
                <Link href="/email-verification">Verify your email</Link>
            </div>
        </div>
    );
}
