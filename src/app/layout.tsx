import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a root layout file
// is required in Next.js App Router to pass children through.
export default function RootLayout({ children }: Props) {
  return children;
}
