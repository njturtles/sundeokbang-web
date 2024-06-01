/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com",
                port: "",
                pathname: "/images/**",
            },
        ],
    },
};

export default nextConfig;
