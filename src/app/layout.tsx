import './globals.scss';
import { Onest } from 'next/font/google';

const font = Onest({
    subsets: ['cyrillic'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={font.className}>{children}</body>
        </html>
    );
}
