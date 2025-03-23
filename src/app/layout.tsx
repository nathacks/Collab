import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { RootProviders } from '@/app/RootProviders';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Collab - NextJS',
    description: 'This project aims to provide a SaaS platform with workspace creation, enabling a file manager system. Future features will include chat functionality and a calendar system to enhance collaboration within workspaces',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex bg-sidebar`}
        >
        <RootProviders>
            {children}
        </RootProviders>
        </body>
        </html>
    );
}
