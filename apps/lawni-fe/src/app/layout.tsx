// import './globals.css';
import '@repo/ui/globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@repo/ui/components/modal';
import { QueryProvider } from '@/shared/components/provider';

export const metadata: Metadata = {
  title: 'LAWNI',
  description: '쉽고 간편하게 민사소송 완료',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="robots" content="index,nofollow" />
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Script-Type" content="Text/javascript" />
        {/* <meta name="viewport" content="initial-scale=1.0, user-scalable=no, maximum-scale=1, width=device-width" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, interactive-widget=resizes-content"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-[#eef3ff]">
        <QueryProvider>
          <div className="must-container select-none">{children}</div>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
