import '@repo/ui/globals.css';

import { Toaster } from '@repo/ui/components/modal';
import { QueryProvider } from '@/shared/components/provider';
import { HOME_META } from '@/config/config-map';

export const metadata = HOME_META;

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, interactive-widget=resizes-content"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Script-Type" content="Text/javascript" />
      </head>
      <body>
        <QueryProvider>
          <div className="must-container select-none">{children}</div>
        </QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
