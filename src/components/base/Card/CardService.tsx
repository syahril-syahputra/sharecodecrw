import ImageCard from "../Image/ImageCard"

export default function CardService({
    image_url, 
    title,
    price,
    payment_type
}: {
    image_url: string;
    title: string;
    price: string;
    payment_type: string;
}){
    return (
        <div className="relative w-96 h-60 rounded-lg overflow-hidden shadow-lg bg-gray-800">
            <ImageCard src={image_url}  className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
                <div className="">
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <div className="-space-y-1">
                        <span className="text-white font-semibold">${price}</span>/ 
                        <span className="text-white font-light">{payment_type}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}