import type { Metadata } from "next";

import { Roboto } from "next/font/google";

const robotoSansSerif = Roboto({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});

import "@/_styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bayholidays.co.za"),
  title: "Bay Holiday Homes",
  description: "Beach and bay-side holiday properties - coastal getaway accommodation",
  keywords: "bay holiday homes, coastal accommodation, beach holiday rentals, bay-side properties, seaside getaways, ocean view rentals, coastal vacation homes, beach house rentals, waterfront accommodation, holiday homes south africa, plettenberg bay accommodation, beach property rentals",
  openGraph: {
    description: "Beach and bay-side holiday properties - coastal getaway accommodation",
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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${robotoSansSerif.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
