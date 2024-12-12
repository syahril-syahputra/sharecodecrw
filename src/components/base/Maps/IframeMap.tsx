export default function IframeMap(props: {
    latitude: number | undefined;
    longitude: number | undefined;
}) {
    const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=
            ${Number(props?.longitude) - 0.01},
            ${Number(props?.latitude) - 0.01},
            ${Number(props?.longitude) + 0.01},
            ${Number(props?.latitude) + 0.01}&layer=mapnik&marker=
            ${props?.latitude},
            ${props?.longitude}`;
    return (
        <iframe
            className="mb-4 h-60 w-full rounded-lg"
            frameBorder="0"
            style={{ border: 0 }}
            src={iframeSrc}
            allowFullScreen
        ></iframe>
    );
}
