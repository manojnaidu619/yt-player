import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
    title: 'YT Player',
    description: 'A simple YouTube video player application',
    metadataBase: new URL(baseUrl),
    openGraph: {
        title: 'YT Player',
        description: 'A simple YouTube video player application',
        type: 'website',
        images: [
            {
                url: '/opengraph-image.jpg',
                alt: 'YT Player - A simple YouTube video player application',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YT Player',
        description: 'A simple YouTube video player application',
        images: ['/opengraph-image.jpg'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} flex flex-col h-screen`}>
                <Providers>
                    <Navbar />
                    <main className="flex-1 flex items-center justify-center">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
