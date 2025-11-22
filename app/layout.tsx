import { fontMono, fontSans } from '@/Shared/lib/fonts';
import StandardLayout from '@/Shared/Layouts/StandardLayout';
import { ReduxProvider } from '@/Shared/Redux/ReduxProvider';
import type React from 'react';
import '../styles/globals.css';
import { WebSocketProvider } from '@/Shared/Socket/WebSocketContext';
import { Suspense } from 'react';
import { PageLoader } from '@/Shared/components/PageLoader';
import { CustomLoader } from '@/Shared/components/CustomLoader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'next js app',
              url: 'yourdomain.com',
              logo: 'https://yourdomain.com/logo.svg',
              sameAs: [
                'https://www.facebook.com/yourdomain',
                'https://twitter.com/yourdomain',
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ReduxProvider>
          {/* <WebSocketProvider> */}
            <CustomLoader />
            <Suspense fallback={<PageLoader show />}>
              <StandardLayout>{children}</StandardLayout>
            </Suspense>
          {/* </WebSocketProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
