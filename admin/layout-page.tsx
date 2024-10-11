import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen">{children}</body>
    </html>
  );
}

export function getRootLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
}
