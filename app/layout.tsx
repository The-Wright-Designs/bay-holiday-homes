import type { Metadata } from "next";

import { Open_Sans } from "next/font/google";

const openSansSerif = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import "@/_styles/globals.css";
import Header from "@/_components/navigation/header";
import Footer from "@/_components/navigation/footer";
import {
  sharedOpenGraph,
  sharedTwitter,
} from "@/_lib/utils/structured-data";

const siteDescription =
  "Beach and bay-side holiday properties - coastal getaway accommodation in Plettenberg Bay, South Africa.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bayholidays.co.za"),
  title: {
    default: "Bay Holiday Homes | Holiday Rentals in Plettenberg Bay",
    template: "%s | Bay Holiday Homes",
  },
  description: siteDescription,
  keywords:
    "bay holiday homes, coastal accommodation, beach holiday rentals, bay-side properties, seaside getaways, ocean view rentals, coastal vacation homes, beach house rentals, waterfront accommodation, holiday homes south africa, plettenberg bay accommodation, beach property rentals",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Bay Holiday Homes | Holiday Rentals in Plettenberg Bay",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    ...sharedTwitter,
    title: "Bay Holiday Homes | Holiday Rentals in Plettenberg Bay",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth">
      <body className={`${openSansSerif.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
