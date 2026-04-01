import { Home, Building2, Briefcase, Compass } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Vastu Consultation | Home, Office & Commercial Vastu",
  description:
    "Get expert Vastu consultation for home, office and commercial properties. Improve positivity, prosperity and success with Vṛddhi Real Estate.",
};

export default function VastuPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <div className="bg-blue-900 py-24 px-6 text-center text-white">
        <Compass className="mx-auto mb-4 w-12 h-12 text-amber-500" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vastu Consultation Services
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Align your property with positive energy, prosperity, and harmony through expert Vastu guidance.
        </p>
      </div>

      {/* SERVICES */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">

          {/* HOME VASTU */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <Home className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Home Vastu</h3>
            <p className="text-slate-600 mb-4">
              Ensure peace, health, and prosperity in your home with proper Vastu alignment.
            </p>
            <ul className="text-slate-600 space-y-2 mb-6">
              <li>• Entrance direction guidance</li>
              <li>• Kitchen & bedroom placement</li>
              <li>• Energy flow correction</li>
            </ul>
            <Link href="/contact" className="text-amber-500 font-semibold">
              Get Consultation →
            </Link>
          </div>

          {/* OFFICE VASTU */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <Briefcase className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Office Vastu</h3>
            <p className="text-slate-600 mb-4">
              Improve productivity, growth, and team harmony in your workplace.
            </p>
            <ul className="text-slate-600 space-y-2 mb-6">
              <li>• Cabin & desk positioning</li>
              <li>• Business growth zones</li>
              <li>• Employee productivity alignment</li>
            </ul>
            <Link href="/contact" className="text-amber-500 font-semibold">
              Get Consultation →
            </Link>
          </div>

          {/* COMMERCIAL VASTU */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <Building2 className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Commercial Vastu</h3>
            <p className="text-slate-600 mb-4">
              Maximize profitability and customer flow in commercial spaces.
            </p>
            <ul className="text-slate-600 space-y-2 mb-6">
              <li>• Shop & showroom layout</li>
              <li>• Cash counter positioning</li>
              <li>• Customer attraction zones</li>
            </ul>
            <Link href="/contact" className="text-amber-500 font-semibold">
              Get Consultation →
            </Link>
          </div>

        </div>
      </div>

      {/* BENEFITS */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Why Vastu Matters?
          </h2>
          <p className="text-slate-600 text-lg mb-6">
            Vastu Shastra helps create harmony between humans and their surroundings. 
            A well-balanced space enhances positivity, success, and well-being.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-slate-50 p-6 rounded-xl">
              <p className="font-semibold text-slate-900">✔ Positive Energy</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <p className="font-semibold text-slate-900">✔ Financial Growth</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <p className="font-semibold text-slate-900">✔ Peace & Harmony</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-900 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Space?
        </h2>
        <p className="text-slate-300 mb-6">
          Get expert Vastu consultation today and bring balance to your life.
        </p>
        <Link
          href="/contact"
          className="bg-amber-500 hover:bg-amber-600 px-8 py-3 rounded-lg font-semibold text-white transition"
        >
          Book Consultation
        </Link>
      </div>

    </div>
  );
}