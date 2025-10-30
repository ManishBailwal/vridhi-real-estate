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
    <main className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Our Agents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </main>
  )

  }
