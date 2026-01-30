// app/layout.jsx
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";

// Setup body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

// Setup heading font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

// SEO Metadata
export const metadata = {
  title: {
    default: "Vṛddhi Real Estate | Buy Property, Flats & Homes in Dehradun",
    template: "%s | Vṛddhi Real Estate"
  },
  description: "Looking for property in Dehradun? Vṛddhi Real Estate offers premium flats, villas, plots & commercial spaces. Trusted property dealers in Dehradun.",
  keywords: [
    "real estate in Dehradun",
    "property in Dehradun",
    "Dehradun property dealers",
    "flats for sale in Dehradun",
    "villas in Dehradun",
    "buy property Dehradun",
    "Vṛddhi Real Estate",
    "commercial property in Dehradun",
    "plots in Dehradun",
    "residential property in Dehradun",
    "best real estate company in Dehradun",
    "affordable flats in Dehradun",
    "luxury villas in Dehradun"
  ],
  authors: [{ name: "Vṛddhi Real Estate" }],
  creator: "Vṛddhi Real Estate",
  publisher: "Vṛddhi Real Estate",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://Vṛddhi Realestate.com",
    siteName: "Vṛddhi Real Estate",
    title: "Vṛddhi Real Estate | Property & Homes in Dehradun",
    description: "Buy flats, villas, plots and commercial property in Dehradun with Vṛddhi Real Estate. Trusted property consultants for premium and affordable properties.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vṛddhi Real Estate | Property & Homes in Dehradun",
    description: "Buy flats, villas, plots and commercial property in Dehradun with Vṛddhi Real Estate.",
  },
  alternates: {
    canonical: "https://Vṛddhi Realestate.com",
  },
  other: {
    "language": "English",
  }
};

// JSON-LD Schema for Local Business / Real Estate Agent
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Vṛddhi Real Estate",
  "description": "Buy flats, villas, plots and commercial property in Dehradun with Vṛddhi Real Estate. Trusted property consultants for premium and affordable properties.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4, East Canal Road",
    "addressLocality": "Dehradun",
    "addressRegion": "Uttarakhand",
    "postalCode": "248001",
    "addressCountry": "India"
  },
  "telephone": "+91 97190 50969",
  "url": "https://Vṛddhi Realestate.com",
  "priceRange": "$$",
  "areaServed": {
    "@type": "City",
    "name": "Dehradun"
  },
  "sameAs": [
    "https://www.facebook.com/Vṛddhi RealEstateConsultants",
    "https://www.instagram.com/Vṛddhi.consultants.dehradun",
    "https://youtube.com/@Vṛddhi Realestateconsultants",
    "https://wa.me/message/XO43AKEANE2MI1"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans flex flex-col min-h-screen`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
