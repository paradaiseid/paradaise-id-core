"use client";

export default function HomeEnPage() {
  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">paradaise.id</p>
        <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
          Don&apos;t reset context.
          <br />
          Recover it improved.
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed">
          Every time you open a new conversation with your tools, you start from zero.
        </p>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed mt-4">
          paradaise.id keeps your context alive between conversations, tools, and days.
          Under your consent.
        </p>
        <p className="text-white/55 text-base sm:text-lg leading-relaxed mt-6">
          The interactive demo is in Spanish for now. Try it to feel how it works — most
          of it is visual.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-white/90 transition-opacity"
        >
          Start the demo (Spanish)
        </a>
        <a
          href="/en/manifesto"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm border border-white/20 text-white/80 hover:border-white/40 transition-colors"
        >
          Read the manifesto
        </a>
      </div>

      <p className="text-white/40 text-xs mt-12 leading-relaxed">
        We&apos;re translating the full demo. Join the waitlist via the Spanish landing to
        receive an English invite as soon as it&apos;s ready.
      </p>
    </div>
  );
}
