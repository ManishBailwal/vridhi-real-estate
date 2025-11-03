import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/constants'
import { CheckCircle2 } from 'lucide-react'

export default function SellersGuidePage() {
  const steps = [
    {
      title: 'Get a realistic valuation',
      desc: 'We assess current market demand and comparable sales to give you an accurate price range.'
    },
    {
      title: 'Prepare paperwork',
      desc: 'Gather title documents, tax receipts and approvals to avoid delays during sale.'
    },
    {
      title: 'Stage & market',
      desc: 'Professional staging, quality photos and targeted listing reach the right buyers faster.'
    },
    {
      title: 'Negotiate & transfer',
      desc: 'We manage offers, counter-offers and coordinate legal closing for a clean transfer.'
    }
  ]

  const checklist = [
    'Clear title and sale deed',
    'Updated property tax receipts',
    'Building approvals and occupancy certificate',
    'Latest utility bills',
    'No-objection certificates (if applicable)'
  ]

  return (
    <div className="bg-gradient-to-b from-white to-slate-50">
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Seller's Guide</h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600">Practical steps and documentation checklist to sell your property quickly and at the best price.</p>
          <div className="mt-6 inline-flex items-center bg-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow">Premium seller support</div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sell with confidence in 4 steps</h2>
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
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Seller checklist</h3>
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
                <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold shadow">Request a free valuation</Link>
              </div>
            </div>

            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
                <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop" alt="House staging" className="w-full h-72 object-cover" width={1200} height={800} />
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-slate-900">Maximise sale value</h4>
                  <p className="text-sm text-slate-600 mt-2">Small investments in staging and repairs can significantly increase buyer interest and final price.</p>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
                    <div>
                      <dt className="font-semibold">Professional Photos</dt>
                      <dd>High-quality images increase listing views and perceived value.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Clear Title</dt>
                      <dd>Buyers and banks prefer properties with clean, verifiable titles.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Repairs</dt>
                      <dd>Fix small defects — buyers notice and negotiate against them.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Open Houses</dt>
                      <dd>Organised visits help buyers connect emotionally with the property.</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <Link href="/listings" className="text-amber-500 font-semibold hover:underline">See how we market listings →</Link>
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
            <h3 className="text-2xl font-bold text-sky-900 mb-3">Ready to sell?</h3>
            <p className="text-slate-600 mb-6">Connect with our sales team for a free market valuation and a tailored selling plan.</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-sky-900 hover:bg-indigo-900 text-white rounded-lg font-semibold">Book a free consultation</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
