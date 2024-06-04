'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './ThemeProvider';
import Providers from './providers';
import { SessionProvider } from 'next-auth/react';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Providers>
                        <SessionProvider>{children}</SessionProvider>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
