// Listings page metadata for SEO
export const metadata = {
    title: "Property Listings | Flats, Villas & Plots for Sale in Dehradun",
    description: "Browse premium property listings in Dehradun. Find flats, villas, plots, and commercial spaces for sale. Explore our curated collection of properties with Vṛddhi Real Estate.",
    keywords: [
        "property listings Dehradun",
        "flats for sale Dehradun",
        "villas in Dehradun",
        "plots for sale Dehradun",
        "buy property Dehradun",
        "residential property Dehradun",
        "commercial property Dehradun",
        "real estate listings Dehradun"
    ],
    openGraph: {
        title: "Property Listings | Vṛddhi Real Estate",
        description: "Browse premium property listings in Dehradun. Find flats, villas, plots, and commercial spaces for sale.",
        type: "website",
        locale: "en_IN",
        url: "https://Vṛddhi Realestate.com/listings",
    },
    twitter: {
        card: "summary_large_image",
        title: "Property Listings | Vṛddhi Real Estate",
        description: "Browse premium property listings in Dehradun. Find flats, villas, plots, and commercial spaces for sale.",
    },
    alternates: {
        canonical: "https://Vṛddhi Realestate.com/listings",
    },
};

export default function ListingsLayout({ children }) {
    return children;
}
