// app/layout.jsx

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}