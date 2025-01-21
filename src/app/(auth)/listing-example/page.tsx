import RateBusiness from '@/components/base/Rate/RateBusiness';
import React from 'react';

export default function CoolCard() {
    // data dari API
    const items = [
        {
            id: 1,
            is_color: false,
            is_big: false,
            title: 'House Moving',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '12 KM',
            price: '$499.99+',
            rating: 4.5,
            reviews: '15K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 2,
            is_color: false,
            is_big: true,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 3,
            is_color: true,
            is_big: true,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 4,
            is_color: false,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 5,
            is_color: true,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 6,
            is_color: false,
            is_big: true,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 7,
            is_color: true,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 8,
            is_color: false,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 9,
            is_color: false,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 10,
            is_color: false,
            is_big: true,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 11,
            is_color: false,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 12,
            is_color: true,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 13,
            is_color: false,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
        {
            id: 14,
            is_color: false,
            is_big: false,
            title: 'Office Relocation',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            distance: '20 KM',
            price: '$999.99+',
            rating: 4.7,
            reviews: '10K',
            company: 'Snoopy LLC',
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
        },
    ];

    // data perlu di pisah, kolom ganjil dan kolom genap (kiri kanan)
    const column1 = items.filter((_, index) => index % 2 === 0); // Even index
    const column2 = items.filter((_, index) => index % 2 !== 0); // Odd index

    return (
        <div className="flex w-6/12 gap-4">
            <RateBusiness businessId={'01JHHRTAEHDD1GBGS9ZYSGY5TX'} rate={1} />
            {/* Column 1 */}
            <div className="flex w-1/2 flex-col gap-4">
                {column1.map((item) => (
                    <div
                        key={item.id}
                        className={`flex flex-col justify-between rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white shadow-lg 
                ${item.is_big ? 'h-96' : 'h-64'}
                ${item.is_color ? 'from-gray-800 to-emerald-500' : 'from-gray-800 to-gray-900'}
                `}
                    >
                        {/* Top Section */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        {item.company}
                                    </h3>
                                    <div className="flex items-center text-xs text-gray-400">
                                        <span className="mr-1 text-yellow-400">
                                            &#9733;
                                        </span>
                                        <span>{item.rating}</span>
                                        <span className="ml-2">
                                            {item.reviews} reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Section */}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-sm text-gray-300">
                                {item.description}
                            </p>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                                {item.distance}
                            </span>
                            <span className="text-lg font-semibold">
                                {item.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Column 2 */}
            <div className="flex w-1/2 flex-col gap-4">
                {column2.map((item) => (
                    <div
                        key={item.id}
                        className={`flex flex-col justify-between rounded-lg from-gray-800 to-gray-900 p-4 text-white shadow-lg 
                    ${item.is_big ? 'h-96' : 'h-64'}
                    ${item.is_color ? 'bg-gradient-to-l from-gray-800 to-emerald-500' : 'bg-gradient-to-r from-gray-800 to-gray-900'}
                    `}
                    >
                        {/* Top Section */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        {item.company}
                                    </h3>
                                    <div className="flex items-center text-xs text-gray-400">
                                        <span className="mr-1 text-yellow-400">
                                            &#9733;
                                        </span>
                                        <span>{item.rating}</span>
                                        <span className="ml-2">
                                            {item.reviews} reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Section */}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-sm text-gray-300">
                                {item.description}
                            </p>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                                {item.distance}
                            </span>
                            <span className="text-lg font-semibold">
                                {item.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
