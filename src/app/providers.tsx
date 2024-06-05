'use client';
import React, { Suspense } from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Suspense>
                {children}
                <Next13ProgressBar
                    height="4px"
                    color="#ff6969"
                    options={{ showSpinner: false }}
                    showOnShallow
                />
            </Suspense>
        </>
    );
};

export default Providers;
