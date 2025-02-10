'use client';
import './globals.css';
import { Inter, Koulen, Roboto, Urbanist } from 'next/font/google';
import { ThemeProvider } from './ThemeProvider';
import Providers from './providers';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import ErrorBoundary from '@/components/error-boundaries/ErrorBoundary';
import GlobalErrorHandler from '@/components/error-boundaries/GlobalErrorHandler';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const urbanist = Urbanist({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-urbanist',
});
const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
    variable: '--font-roboto',
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
        <html
            lang="en"
            className={`${inter.variable} ${koulen.variable} ${roboto.variable} ${urbanist.variable}`}
        >
            <body className="font-saans">
                <ErrorBoundary>
                    <GlobalErrorHandler />
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
                </ErrorBoundary>
            </body>
        </html>
    );
}
