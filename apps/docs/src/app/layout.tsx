import '@/styles/globals.css';
import '@/styles/react-flow.css';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import { ModalProvider } from '@/components/modal-launcher';

export const metadata: Metadata = {
  title: 'AF Docs',
  description: 'Українська технічна документація AF app та AF API',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="uk" className="dark">
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <ModalProvider>{children}</ModalProvider>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
