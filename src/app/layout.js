// app/layout.jsx

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // Import the Header component
import { Footer } from "@/components/Footer"; // Import the Footer component

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

export const metadata = {
  title: "Premium Realty",
  description: "Your key to premier properties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Added flex flex-col min-h-screen to ensure footer stays at bottom */}
      <body className={`${inter.variable} ${playfair.variable} font-sans flex flex-col min-h-screen`}>
        <Header />
        {/* Changed main to div with flex-grow */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer /> {/* Add the Footer here */}
      </body>
    </html>
  );
}

