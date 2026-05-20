export const metadata = {
  title: "Manifiesto — paradaise.id",
  description: "Por qué existe paradaise.id. La continuidad como principio.",
};

export default function ManifestoPage() {
  return (
    <article className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-12">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Manifiesto</p>
        <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
          No reinicies contexto.
        </h1>
      </header>

      <div className="space-y-6 text-white/75 text-base sm:text-lg leading-relaxed">
        <p>
          Cada vez que abres una nueva conversación con tus herramientas, empiezas desde cero.
          Lo que aprendiste ayer, lo que decidiste hace una semana, lo que descartaste hace un mes —
          todo eso se vuelve invisible. Tu contexto existe, pero rara vez sobrevive entre herramientas.
        </p>

        <p>
          paradaise.id existe para que esa pérdida deje de pasar.
          No para vigilarte. No para optimizarte. Para devolverte tu propio contexto.
        </p>

        <p>
          Trabajamos contigo, no sobre ti. Cada señal que paradaise toma es bajo tu consentimiento,
          reversible, y siempre tuya. Lo que conectamos nunca modifica lo que tú escribiste.
          Lo que devolvemos es continuidad sobre ideas y decisiones que ya eran tuyas.
        </p>

        <p>
          Creemos que la inteligencia no está en las herramientas — está en cómo las cruzas a lo largo del tiempo.
          Las decisiones importantes rara vez nacen en una sola sesión. Se forman entre conversaciones,
          dudas, correcciones y tiempo. paradaise.id preserva esa continuidad y te la devuelve
          cuando más la necesitas.
        </p>

        <p>
          Esto no es productividad. Es continuidad cognitiva. La capacidad de no empezar desde cero
          cada vez que empiezas.
        </p>

        <p>
          La soberanía sobre tus datos no es una promesa de marketing.
          Es la única forma honesta de construir un sistema que vive cerca de cómo piensas.
          Sin soberanía, esto sería vigilancia con buen diseño. Con soberanía, es continuidad.
        </p>

        <p>
          paradaise.id no es otra herramienta. Es la continuidad que permanece entre herramientas,
          conversaciones y tiempo.
        </p>

        <p className="text-white pt-4">
          No reinicies contexto. Recupéralo mejorado.
        </p>
      </div>
    </article>
  );
}
