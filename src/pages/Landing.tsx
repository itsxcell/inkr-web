import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">Inkr</h1>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-zinc-400 hover:text-white transition-colors text-sm">
            Sign in
          </Link>
          <Link
            to="/register"
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Built for African professionals
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Write like you<br />mean business
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
          Inkr helps African professionals write compelling proposals, emails,
          and business documents in seconds — powered by state-of-the-art AI.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Start writing free
          </Link>
          <Link
            to="/login"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Sign in →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Business Proposals',
              description: 'Generate compelling proposals that win clients and close deals.',
              icon: '📄',
            },
            {
              title: 'Professional Emails',
              description: 'Write clear, persuasive emails that get responses.',
              icon: '✉️',
            },
            {
              title: 'Pitch Decks',
              description: 'Craft investor-ready narratives for your startup or project.',
              icon: '🚀',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple credit pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Starter', credits: 100, price: '$5', description: '10 generations' },
            { name: 'Pro', credits: 500, price: '$20', description: '50 generations', popular: true },
            { name: 'Enterprise', credits: 1500, price: '$50', description: '150 generations' },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`bg-zinc-900 border rounded-2xl p-6 ${
                plan.popular ? 'border-amber-500' : 'border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="text-xs text-amber-500 font-medium mb-3">Most popular</div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">{plan.credits} credits · {plan.description}</p>
              <Link
                to="/register"
                className={`block text-center text-sm font-semibold py-2.5 rounded-lg transition-colors ${
                  plan.popular
                    ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-zinc-500 text-sm">© 2026 Inkr. Built by Excel Afonime.</p>
        <a
          href="https://github.com/itsxcell/inkr-api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-white text-sm transition-colors"
        >
          GitHub →
        </a>
      </footer>
    </div>
  )
}