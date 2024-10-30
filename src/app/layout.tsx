import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const RickAndMortyFont = localFont({
  src: './fonts/get_schwifty.ttf',
  display: 'swap',
  variable: '--font-rick'
});

export const metadata: Metadata = {
  title: 'Rick and Morty characters',
  description: 'Rick and Morty characters search'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={RickAndMortyFont.variable}>
      <body className="font-get-schwifty antialiased">
        <AppRouterCacheProvider options={{ key: 'css' }}>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
