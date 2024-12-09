export default function JsonLd(props: {
    name: string;
    image?: string;
    description?: string;
    type?: string;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': props.type,
        name: props.name,
        image: props.image,
        description: props.description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
