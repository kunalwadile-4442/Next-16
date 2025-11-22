'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  decrement,
  increment,
  incrementByAmount,
} from '@/components/home/redux/counterSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHook';
import Link from 'next/link';



export default function HomePage() {
  const count = useAppSelector(state => state?.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div className="bg-green-200 flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl">
            Next.js 16 Starter
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Featuring Redux Toolkit, Tailwind CSS, Docker, and strict linting.
          </p>
          <div className="mt-4">
            <Link href="/about" className="text-primary hover:underline">
              Go to About Page
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Redux Counter Example</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(decrement())}
                aria-label="Decrement"
              >
                -
              </Button>
              <span className="text-4xl font-bold tabular-nums">{count}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(increment())}
                aria-label="Increment"
              >
                +
              </Button>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => dispatch(incrementByAmount(5))}>
                Increment by 5
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                <li>Next.js 16 (App Router)</li>
                <li>React 19</li>
                <li>Redux Toolkit (Persisted)</li>
                <li>Tailwind CSS v4</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tooling</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                <li>ESLint + Prettier</li>
                <li>Husky + Commitlint</li>
                <li>Docker + Compose</li>
                <li>TypeScript Strict</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
