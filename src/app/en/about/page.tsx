export const metadata = {
  title: "About — paradaise.id",
  description: "Who is behind paradaise.id.",
};

export default function AboutEnPage() {
  return (
    <article className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">About</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
          We built it so you don&apos;t lose the thread.
        </h1>
      </header>

      <div className="space-y-6 text-white/75 text-[15px] leading-relaxed">
        <p>
          paradaise.id was born from a simple observation: the tools we think with today
          forget everything we told them yesterday. Intelligence accumulates, but context
          resets with every new session. That silent loss is what we want to stop.
        </p>

        <p>
          We operate from Mexico, with presence across LATAM and connections to researchers
          and founders in Europe, the United States, and Asia. We work close to the people
          who understand that cognitive continuity is not a luxury — it is the foundation
          of how we actually make progress on difficult things.
        </p>

        <p>
          paradaise.id is a product of{" "}
          <strong className="text-white/90">Somos Originales S.A.P.I. de C.V.</strong>, a
          Mexican company founded on the conviction that what is authentic deserves the
          infrastructure to prove it is.
        </p>

        <p>
          If you want to talk to the team, write to{" "}
          <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">
            hello@paradaise.id
          </a>
          . If you want to invest, there&apos;s a dedicated page at{" "}
          <a href="/en/inversionistas" className="text-cyan-300 hover:underline">
            /investors
          </a>
          . If you&apos;re curious about the why, read the{" "}
          <a href="/en/manifesto" className="text-cyan-300 hover:underline">
            manifesto
          </a>
          .
        </p>
      </div>
    </article>
  );
}
