import type { Metadata } from 'next';
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

// We'll use system fonts instead of loading Inter to avoid font loading issues

export const metadata: Metadata = {
  title: 'Arnnik Islam Payel',
  description: 'Student | Aspiring Web Developer | Wi-Fi Pentester | Tech Content Creator',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
