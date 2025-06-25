import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Common/Header/Header";

const fontLato = Lato({
  weight:['100', '300', '400', '700', '900'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Movie Site",
  description: "Watch your favorite movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontLato.className} antialiased bg-rich-black`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}