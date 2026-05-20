export const metadata = {
  title: "About — paradaise.id",
  description: "Quién está detrás de paradaise.id.",
};

export default function AboutPage() {
  return (
    <article className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">About</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
          Lo construimos para que no pierdas el hilo.
        </h1>
      </header>

      <div className="space-y-6 text-white/75 text-[15px] leading-relaxed">
        <p>
          paradaise.id nació de una observación simple: las herramientas con las que pensamos hoy
          olvidan todo lo que les dijimos ayer. La inteligencia se acumula, pero el contexto se reinicia
          en cada nueva sesión. Esa pérdida silenciosa es lo que queremos detener.
        </p>

        <p>
          Operamos desde México, con presencia en LATAM y conexiones con investigadores y founders en
          Europa, Estados Unidos y Asia. Trabajamos cerca de las personas que entienden que la continuidad
          cognitiva no es un lujo — es la base de cómo realmente avanzamos en algo difícil.
        </p>

        <p>
          paradaise.id es un producto de <strong className="text-white/90">Somos Originales S.A.P.I. de C.V.</strong>,
          una empresa mexicana fundada con la convicción de que lo auténtico merece la infraestructura
          para demostrar que lo es.
        </p>

        <p>
          Si quieres hablar con el equipo, escríbenos a <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">hello@paradaise.id</a>.
          Si quieres invertir, hay una página dedicada en{" "}
          <a href="/inversionistas" className="text-cyan-300 hover:underline">/inversionistas</a>.
          Si te interesa el por qué, lee el <a href="/manifesto" className="text-cyan-300 hover:underline">manifesto</a>.
        </p>
      </div>
    </article>
  );
}
