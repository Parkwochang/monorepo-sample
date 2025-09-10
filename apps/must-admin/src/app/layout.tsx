import type { Metadata } from 'next';
import '@repo/ui/styles/must-admin.css';

import { SidebarProvider } from '@workspace/ui/components/navigator';
import { ThemeProvider } from '@workspace/ui/lib';

import { QueryProvider } from '@/config/settings';
import { Toaster } from '@workspace/ui/components/modal';

export const metadata: Metadata = {
  title: 'Weeple 관리자',
  description: 'Weeple admin Page',
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
        {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Script-Type" content="Text/javascript" />
        {/* <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' /> */}
        {/* <Script src="https://payspg.shinhan.com/businessPayment/unifiedPay/script" /> */}
      </head>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            // enableColorScheme
          >
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
