/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dummy-crowner-space.sfo2.digitaloceanspaces.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
