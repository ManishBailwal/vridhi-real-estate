// components/ServicesSection.jsx
import { Home, Building2, Key, TrendingUp, FileText, Users } from 'lucide-react';
import { SITE } from '@/lib/constants';

const services = [
  {
    icon: Building2,
    title: "Real Estate Consultant",
  description: `${SITE.title} is a reputed real estate consultant based in Uttarakhand. We assist the valued clients in their endeavor to buying property, selling property & renting property of all kinds.`
  },
  {
    icon: Key,
    title: "Property Management",
    description: "We provide comprehensive property management services to ensure your investment is well-maintained and generates optimal returns. Our team handles everything from tenant screening to maintenance."
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Our expert advisors help you make informed investment decisions in the real estate market. We analyze market trends and provide insights for maximizing your returns."
  },
  {
    icon: FileText,
    title: "Legal Documentation",
    description: "We handle all legal documentation and compliance requirements for property transactions, ensuring a smooth and secure process for our clients."
  },
  {
    icon: Users,
    title: "Customer Support",
    description: "Our dedicated support team is available to assist you throughout your property journey, from initial inquiry to post-purchase support."
  },
  {
    icon: Home,
    title: "Customized Property Solutions",
    description: "We offer tailored property solutions to meet the unique needs of each client, ensuring a personalized experience from start to finish."
  }
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-500 rounded-lg shadow-lg ring-1 ring-amber-400/20">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Title with Underline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-900">Services</span>{" "}
            <span className="text-amber-500">We Offer</span>
          </h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-32 bg-amber-500 rounded-full"></div>
          </div>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            We work with the vision to make a modest contribution to the real estate industry by engaging in an array of activities while upholding the highest standards of ethics and morality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-amber-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="mb-6 inline-block p-4 bg-amber-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-500 ring-1 ring-amber-400/20">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* View More Link */}
                <button className="text-slate-900 font-semibold hover:text-amber-600 transition-colors inline-flex items-center gap-2 group/btn">
                  View More
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}