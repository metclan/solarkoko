/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',}
        ]
    
    },
    experimental : {
        instrumentationHook : true
    }
};

export default nextConfig;
