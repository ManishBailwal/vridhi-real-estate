// components/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Header />}
            <main className="flex-grow">
                {children}
            </main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <WhatsAppButton />}
        </>
    );
}
