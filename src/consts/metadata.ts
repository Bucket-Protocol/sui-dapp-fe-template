import { Metadata } from 'next';

const title = '#';
const description = '#';

export const metadata: Readonly<Metadata> = {
  title,
  description,
  metadataBase: new URL('https://localhost'),
  openGraph: {
    type: 'website',
    title,
    description,
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    site: '#',
    title,
    description,
    images: '/og-image.png',
  },
  icons: {
    shortcut: '/favicon.png',
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-167x167.png', sizes: '167x167', type: 'image/png' },
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};
