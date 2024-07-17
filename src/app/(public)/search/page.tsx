import TitleSearchResult from '@/components/base/Title/TitleSearchResult';
import React from 'react';

export default function page() {
    return (
        <div className="space-y-8 py-4">
            <div className="mx-auto max-w-2xl rounded-md p-4 shadow-xl">
                <TitleSearchResult>Related Results</TitleSearchResult>
                <ul>
                    <li>Irure qui elit</li>
                    <li>Irure qui elit</li>
                    <li>Irure qui elit</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex-1 rounded-md p-4 shadow-xl">
                    <TitleSearchResult>Community Tutors</TitleSearchResult>
                    <ul>
                        <li>Irure qui elit</li>
                        <li>Irure qui elit</li>
                        <li>Irure qui elit</li>
                    </ul>
                </div>
                <div className="flex-1 rounded-md p-4 shadow-xl">
                    <TitleSearchResult>Events</TitleSearchResult>
                    <ul>
                        <li>Irure qui elit</li>
                        <li>Irure qui elit</li>
                        <li>Irure qui elit</li>
                    </ul>
                </div>
                <div className="flex-1 rounded-md p-4 shadow-xl">
                    <TitleSearchResult>Communitites</TitleSearchResult>
                    <ul>
                        <li>Irure qui elit</li>
                        <li>Irure qui elit</li>
                        <li>Irure qui elit</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
