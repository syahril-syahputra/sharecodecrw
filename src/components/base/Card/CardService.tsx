import ImageCard from '../Image/ImageCard';

export default function CardService({
    image_url,
    title,
    price,
    payment_type,
}: {
    image_url: string;
    title: string;
    price: string;
    payment_type: string;
}) {
    return (
        <div className="relative h-60 w-96 overflow-hidden rounded-lg bg-gray-800 shadow-lg">
            <ImageCard src={image_url} className="h-full w-full object-cover" />

            <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-8">
                <div className="">
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <div className="-space-y-1">
                        <span className="font-semibold text-white">
                            ${price}
                        </span>
                        /
                        <span className="font-light text-white">
                            {payment_type}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
