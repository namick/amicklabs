import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

const SITE_URL = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.intro,
  applicationName: site.name,
  keywords: [
    "Amick Labs",
    "Amick Labs LLC",
    "Nathan Amick",
    "technical training",
    "software engineering instructor",
    "AI engineering training",
    "video production",
    "Indianapolis",
  ],
  authors: [{ name: site.person.name, url: site.person.url }],
  creator: site.person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: site.name,
      legalName: site.legalName,
      url: SITE_URL,
      description: site.tagline,
      founder: { "@id": `${site.person.url}/#person` },
      address: { "@type": "PostalAddress", addressLocality: "Indianapolis", addressRegion: "IN", addressCountry: "US" },
    },
    {
      "@type": "Person",
      "@id": `${site.person.url}/#person`,
      name: site.person.name,
      url: site.person.url,
      worksFor: { "@id": `${SITE_URL}/#org` },
      sameAs: [site.person.url],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="scanlines min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
