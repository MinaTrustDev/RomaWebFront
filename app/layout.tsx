import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SEO_CONSTANTS } from "@/core/domain/constants/seo.constant";
import { QueryProvider } from "@/lib/providers/query-provider";
import { NavigationLoading } from "@/components/navigation/navigation-loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONSTANTS.siteUrl),
  title: {
    default: SEO_CONSTANTS.defaultTitle,
    template: `%s | ${SEO_CONSTANTS.siteName}`,
  },
  description: SEO_CONSTANTS.defaultDescription,
  keywords: SEO_CONSTANTS.keywords,
  authors: [{ name: SEO_CONSTANTS.siteName }],
  creator: SEO_CONSTANTS.siteName,
  publisher: SEO_CONSTANTS.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: SEO_CONSTANTS.locale,
    url: SEO_CONSTANTS.siteUrl,
    siteName: SEO_CONSTANTS.siteName,
    title: SEO_CONSTANTS.defaultTitle,
    description: SEO_CONSTANTS.defaultDescription,
    images: [
      {
        url: `${SEO_CONSTANTS.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SEO_CONSTANTS.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONSTANTS.defaultTitle,
    description: SEO_CONSTANTS.defaultDescription,
    images: [`${SEO_CONSTANTS.siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SEO_CONSTANTS.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationLoading />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
