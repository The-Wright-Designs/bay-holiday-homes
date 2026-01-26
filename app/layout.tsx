import type { Metadata } from "next";

import { Open_Sans } from "next/font/google";

const openSansSerif = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

import "@/_styles/globals.css";
import Header from "@/_components/navigation/header";
import Footer from "@/_components/navigation/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bayholidays.co.za"),
  title: "Bay Holiday Homes",
  description:
    "Beach and bay-side holiday properties - coastal getaway accommodation",
  keywords:
    "bay holiday homes, coastal accommodation, beach holiday rentals, bay-side properties, seaside getaways, ocean view rentals, coastal vacation homes, beach house rentals, waterfront accommodation, holiday homes south africa, plettenberg bay accommodation, beach property rentals",
  openGraph: {
    description:
      "Beach and bay-side holiday properties - coastal getaway accommodation",
    type: "website",
    locale: "en_ZA",
    siteName: "Bay Holiday Homes",
    images: [
      {
        url: "/open-graph-image.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSansSerif.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
