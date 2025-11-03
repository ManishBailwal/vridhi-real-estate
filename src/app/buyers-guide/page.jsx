import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/constants';
import { CheckCircle2 } from 'lucide-react';

export default function BuyersGuidePage() {
  const steps = [
    {
      title: 'Define your budget',
      desc: 'Understand your borrowing power and set a clear, realistic budget before you start looking.'
    },
    {
      title: 'Choose location & type',
      desc: 'Decide on neighbourhoods, property type and must-have features to narrow your search.'
    },
    {
      title: 'Inspect & shortlist',
      desc: 'Visit properties, verify documentation and shortlist options that meet your criteria.'
    },
    {
      title: 'Negotiate & close',
      desc: 'We assist with price negotiation, legal checks and smooth closing — so you sign with confidence.'
    }
  ];

  const checklist = [
    'Copy of title deed / sale agreement',
    'Property tax receipts / No dues certificates',
    'Encumbrance certificate',
    'Approved building plan and occupancy certificate',
    'Utility bills and receipts',
    'NOC from society/association (if applicable)'
  ];

  return (
    <div className="bg-gradient-to-b from-white to-slate-50">
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Buyer's Guide</h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            A practical, step-by-step guide to buying property in Dehradun. Use this as a checklist while you search, inspect and close your next home.
          </p>
          <div className="mt-6 inline-flex items-center bg-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow">Trusted by local buyers</div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4 Steps to a Confident Purchase</h2>
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-500 text-white shadow-md font-bold">{i+1}</div>
                    <div>
                      <div className="text-lg font-semibold text-slate-900">{s.title}</div>
                      <div className="text-sm text-slate-600">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Essential checklist</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {checklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold shadow">Get personalised help</Link>
              </div>
            </div>

            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
                <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop" alt="House staging" className="w-full h-72 object-cover" width={1200} height={800} />
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-slate-900">Inspection checklist</h4>
                  <p className="text-sm text-slate-600 mt-2">What to look for when inspecting a property: structure, water, wiring, ventilation and legal clarity.</p>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
                    <div>
                      <dt className="font-semibold">Structural Safety</dt>
                      <dd>Look for cracks, dampness and uneven floors.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Water Supply</dt>
                      <dd>Check source, pressure and past leak history.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Electrical</dt>
                      <dd>Verify wiring, switchboards and earthing.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Documents</dt>
                      <dd>Confirm title, taxes and approvals before closing.</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <Link href="/listings" className="text-amber-500 font-semibold hover:underline">Browse curated listings →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Still unsure? Talk to an expert</h3>
            <p className="text-slate-600 mb-6">Our agents provide personalised guidance through financing, negotiation and documentation.</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-sky-900 hover:bg-indigo-900 text-white rounded-lg font-semibold">Book a free consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
