// app/layout.jsx
"use client";

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // Import the Header component
import { Footer } from "@/components/Footer"; // Import the Footer component
import { SITE } from "@/lib/constants";
import { usePathname } from "next/navigation";

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

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      {/* Added flex flex-col min-h-screen to ensure footer stays at bottom */}
      <body className={`${inter.variable} ${playfair.variable} font-sans flex flex-col min-h-screen`}>
        {!isAdminRoute && <Header />}
        {/* Changed main to div with flex-grow */}
        <main className="flex-grow">
          {children}
        </main>
        {!isAdminRoute && <Footer />} {/* Add the Footer here */}
      </body>
    </html>
  );
}

