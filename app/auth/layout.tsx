import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../globals.css";
import StoreProvider from "../provider";

const fontLato = Lato({
  weight:['100', '300', '400', '700', '900'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Movie&Series Site",
  description: "Watch your favorite movies and series",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontLato.className} antialiased bg-rich-black`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}