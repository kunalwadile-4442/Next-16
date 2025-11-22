import type { Metadata } from 'next';
import { constructMetadata } from '@/Shared/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = constructMetadata({
  title: 'About Us',
  description:
    'Learn more about the Next.js 16 Starter template structure and features.',
  image: '/images/about-og.jpg',
});

export default function AboutPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          About This Project
        </h1>
        <p className="text-muted-foreground text-lg">
          This project serves as a robust foundation for modern web
          applications. It integrates industry-standard tools to ensure code
          quality, scalability, and developer experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
