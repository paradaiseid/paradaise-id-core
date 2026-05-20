export const metadata = {
  title: "Manifesto — paradaise.id",
  description: "Why paradaise.id exists. Continuity as a principle.",
};

export default function ManifestoEnPage() {
  return (
    <article className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-12">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Manifesto</p>
        <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
          Don&apos;t reset context.
        </h1>
      </header>

      <div className="space-y-6 text-white/75 text-base sm:text-lg leading-relaxed">
        <p>
          Every time you open a new conversation with your tools, you start from zero.
          What you learned yesterday, what you decided a week ago, what you discarded a month ago —
          all of that becomes invisible. Your context exists, but it rarely survives between tools.
        </p>

        <p>
          paradaise.id exists so that loss stops happening.
          Not to watch you. Not to optimize you. To give you back your own context.
        </p>

        <p>
          We work with you, not on you. Every signal paradaise takes is under your consent,
          reversible, and always yours. What we connect never modifies what you wrote.
          What we return is continuity over ideas and decisions that were already yours.
        </p>

        <p>
          We believe intelligence isn&apos;t in the tools — it&apos;s in how you cross them over time.
          Important decisions rarely arise in a single session. They form between conversations,
          doubts, corrections, and time. paradaise.id preserves that continuity and returns it
          to you when you need it most.
        </p>

        <p>
          This is not productivity. It is cognitive continuity. The ability not to start from zero
          every time you start.
        </p>

        <p>
          Sovereignty over your data is not a marketing promise.
          It is the only honest way to build a system that lives close to how you think.
          Without sovereignty, this would be surveillance with good design. With sovereignty, it is continuity.
        </p>

        <p>
          paradaise.id is not another tool. It is the continuity that remains between tools,
          conversations, and time.
        </p>

        <p className="text-white pt-4">
          Don&apos;t reset context. Recover it improved.
        </p>
      </div>
    </article>
  );
}
