import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Next.js 16',
  description:
    'A production-ready starter template for Next.js 16 featuring Redux Toolkit, Tailwind CSS, Docker support, and strict linting rules.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/vercel',
    github: 'https://github.com/vercel/next.js',
  },
};

type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  openGraph?: object;
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      template: `%s | ${siteConfig.name}`,
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@vercel',
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
