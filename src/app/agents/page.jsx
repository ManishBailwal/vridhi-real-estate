import AgentCard from '@/components/AgentCard'

export default function AgentsPage() {
  // Minimal static data so the page renders reliably. Replace with real data fetching if needed.
  const agents = [
    {
      id: 1,
      name: 'Manish Bailwal',
      title: 'Senior Agent',
      imageUrl: 'https://placehold.co/400x400/1B263B/ffffff?text=Manish+Bailwal',
      bio: 'Experienced agent specializing in luxury and waterfront properties.',
      email: 'manish@example.com',
      phone: '123-456-7890',
      slug: 'manish-bailwal',
    },
    {
      id: 2,
      name: 'Aditya Verma',
      title: 'Residential Specialist',
      imageUrl: 'https://placehold.co/400x400/0D1B2A/ffffff?text=Aditya+Verma',
      bio: 'Local market expert with a focus on family homes and investment properties.',
      email: 'aditya@example.com',
      phone: '987-654-3210',
      slug: 'aditya-verma',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-500">Agents</span>
          </h1>
          <div className="h-1 w-32 bg-amber-500 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our experienced team of real estate professionals dedicated to helping you find your dream property.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </main>
  )

  }
