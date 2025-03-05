import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'YT Player',
    description: 'A simple YouTube video player application',
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
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
