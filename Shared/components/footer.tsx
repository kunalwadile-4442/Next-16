import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <Link href="#" className="font-medium underline underline-offset-4">
              Your Team
            </Link>
            . The source code is available on{' '}
            <Link href="#" className="font-medium underline underline-offset-4">
              GitHub
            </Link>
            .
          </p>
          <div className="text-muted-foreground flex gap-4 text-sm">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
