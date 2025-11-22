

import LogoutSucess from '@/Shared/Popup/LogoutSucess';
import { constructMetadata } from '@/Shared/seo';
import { App_url } from '@/Shared/static';
import HomePage from '@/components/home/home-page';
import { useModalController } from '@/hooks/useModalController';
import type { Metadata } from 'next';
import { useCallback, useMemo } from 'react';

export const metadata: Metadata = constructMetadata({
  title: 'Next.js 16 Starter - Redux Toolkit & Docker',
  description:
    'A production-ready starter template for Next.js 16 featuring Redux Toolkit, Tailwind CSS, Docker support, and strict linting rules.',
  openGraph: {
    title: 'Next.js 16 Starter - Redux Toolkit & Docker',
    description:
      'A production-ready starter template for Next.js 16 featuring Redux Toolkit, Tailwind CSS, Docker support, and strict linting rules.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Next.js 16 Starter Preview',
      },
    ],
    type: 'website',
  },
});

export default function Page() {


    const balanceRows = useMemo(
    () => [
      { label: 'Minimum Required:', value: '₹20' },
      { label: 'Current Balance:', value: '₹5' },
      { label: 'Shortfall:', value: '₹15' },
    ],
    []
  );



  return (
    <>
  <HomePage />
   <LogoutSucess
        modalTitle="Thank You"
        description="You have successfully logged out"
        newheight="420px"
        icon={App_url?.icon?.SUCCESS_GIF}
        rows={balanceRows}
      />
      </>
  )
}
