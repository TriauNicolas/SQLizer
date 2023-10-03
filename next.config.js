/** @type {import('next').NextConfig} */
const nextConfig = {
    appDir: true,
    nextAuth: {
        providers: [
            {
                type: 'credentials',
            }
        ]
    },
    env: {
        API_URL: process.env.API_URL,
    }
}

module.exports = nextConfig
