import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "roma2go.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs",
      "lucide-react",
      "embla-carousel-react",
    ],
  },
  // Empty turbopack config to silence error - webpack is used when webpack() function is present
  turbopack: {},
  webpack(config: any) {
    // Find all rules that handle SVG files
    const rules = config.module?.rules;
    
    if (rules) {
      // Find and modify existing SVG rules
      rules.forEach((rule: any) => {
        if (
          rule &&
          typeof rule === "object" &&
          rule.test &&
          typeof rule.test.test === "function" &&
          rule.test.test(".svg")
        ) {
          rule.exclude = /\.svg$/i;
        }
      });

      // Add new SVG rules at the beginning - order matters: more specific first
      // Handle SVG imports with ?url - return the file URL
      rules.unshift({
        test: /\.svg$/i,
        resourceQuery: /\?url$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash][ext]",
        },
      });
      
      // Handle regular SVG imports - convert to React component
      rules.unshift({
        test: /\.svg$/i,
        resourceQuery: { not: [/\?url$/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: false,
            },
          },
        ],
      });
    }

    return config;
  },
};

export default nextConfig;
