// app/layout.tsx

import './globals.css';
import { BlogProvider } from './blog/context/BlogContext';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>My Blog App</title>
      </head>
      <BlogProvider>
        <body>{children}</body>
      </BlogProvider>
    </html>
  );
}
