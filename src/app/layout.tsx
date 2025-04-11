import type { Metadata } from 'next';
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

// We'll use system fonts instead of loading Inter to avoid font loading issues

export const metadata: Metadata = {
  title: {
    default: 'Arnnik Islam Payel - Web Developer & Tech Enthusiast',
    template: '%s | Arnnik Islam Payel'
  },
  description: 'Portfolio of Arnnik Islam Payel - Web Developer, Wi-Fi Pentester, and Tech Content Creator. Explore my projects, skills, and professional journey.',
  keywords: ['Arnnik Islam Payel', 'Web Developer', 'Wi-Fi Pentester', 'Tech Content Creator', 'Portfolio', 'Web Development', 'Cybersecurity', 'React', 'Next.js'],
  authors: [{ name: 'Arnnik Islam Payel' }],
  creator: 'Arnnik Islam Payel',
  publisher: 'Arnnik Islam Payel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arnnikislam.vercel.app',
    title: 'Arnnik Islam Payel - Web Developer & Tech Enthusiast',
    description: 'Portfolio of Arnnik Islam Payel - Web Developer, Wi-Fi Pentester, and Tech Content Creator',
    siteName: 'Arnnik Islam Payel Portfolio',
    images: [
      {
        url: 'https://arnnikislam.vercel.app/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arnnik Islam Payel - Web Developer & Tech Enthusiast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnnik Islam Payel - Web Developer & Tech Enthusiast',
    description: 'Portfolio of Arnnik Islam Payel - Web Developer, Wi-Fi Pentester, and Tech Content Creator',
    images: ['https://arnnikislam.vercel.app/assets/og-image.png'],
    creator: '@arnnikislam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  alternates: {
    canonical: 'https://arnnikislam.vercel.app',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
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
