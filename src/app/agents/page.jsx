import AgentCard from '@/components/AgentCard'

export default function AgentsPage() {
  // Minimal static data so the page renders reliably. Replace with real data fetching if needed.
  const agents = [
    {
      id: 1,
      name: 'Alex Doe',
      title: 'Senior Agent',
      imageUrl: 'https://placehold.co/400x400/1B263B/ffffff?text=Alex+Doe',
      bio: 'Experienced agent specializing in luxury and waterfront properties.',
      email: 'alex@example.com',
      phone: '123-456-7890',
      slug: 'alex-doe',
    },
    {
      id: 2,
      name: 'Maria Smith',
      title: 'Residential Specialist',
      imageUrl: 'https://placehold.co/400x400/0D1B2A/ffffff?text=Maria+Smith',
      bio: 'Local market expert with a focus on family homes and investment properties.',
      email: 'maria@example.com',
      phone: '987-654-3210',
      slug: 'maria-smith',
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
