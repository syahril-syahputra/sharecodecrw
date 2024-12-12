'use client';
import './globals.css';
import { Inter, Koulen } from 'next/font/google';
import { ThemeProvider } from './ThemeProvider';
import Providers from './providers';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const koulen = Koulen({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
    variable: '--font-koulen',
});

/* eslint-disable @typescript-eslint/no-unused-vars */
const metadata: Metadata = {
    title: {
        template: '%s | Simplest to Use',
        default: 'Crowner',
    },
    icons: {
        icon: '/favicon.ico',
    },
    description: 'Simplest to Use',
    metadataBase: new URL('https://crowner.ca'),
};
/* eslint-disable @typescript-eslint/no-unused-vars */

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${koulen.variable}`}>
            <body className="font-inter">
                <Toaster />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Providers>
                        <SessionProvider>
                            <div>{children}</div>
                        </SessionProvider>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
