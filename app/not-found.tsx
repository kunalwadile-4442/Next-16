'use client';

import { App_url } from '@/Shared/static';
import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect(App_url?.link?.HOME_URL);
}
