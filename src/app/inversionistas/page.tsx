export const metadata = {
  title: "Inversionistas — paradaise.id",
  description: "Continuidad contextual como infraestructura.",
};

export default function InversionistasPage() {
  return (
    <article className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-12">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Inversionistas</p>
        <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
          Continuidad contextual como infraestructura.
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
          paradaise.id construye una capa de continuidad contextual para usuarios que trabajan
          entre múltiples herramientas, conversaciones y modelos de IA.
        </p>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mt-4">
          No somos otro wrapper de IA. Construimos infraestructura para que el contexto,
          las decisiones y los procesos de trabajo no se reinicien en cada sesión.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-white text-xl font-semibold mb-4">El problema</h2>
        <p className="text-white/75 text-[15px] leading-relaxed mb-3">
          Las personas que trabajan entre múltiples herramientas todos los días enfrentan la misma fricción.
          El contexto existe, pero rara vez sobrevive entre herramientas y sesiones.
        </p>
        <p className="text-white/75 text-[15px] leading-relaxed mb-3">
          El resultado es fragmentación: ideas que se pierden, decisiones que se repiten,
          procesos que deben reconstruirse constantemente. El trabajo intelectual pierde
          continuidad entre sesiones.
        </p>
        <p className="text-white/75 text-[15px] leading-relaxed mb-3">
          La proliferación acelerada de herramientas IA incrementó la fragmentación operacional
          del usuario. Cada nueva herramienta introduce curvas de aprendizaje, reorganización
          de procesos y reinicios parciales de contexto.
        </p>
        <p className="text-white/75 text-[15px] leading-relaxed">
          La industria optimizó acceso a inteligencia. Todavía no resolvió continuidad entre herramientas.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-xl font-semibold mb-4">Lo que construimos</h2>
        <p className="text-white/75 text-[15px] leading-relaxed mb-3">
          Una capa de continuidad contextual que opera bajo consentimiento granular y reversible,
          permitiendo preservar y reconectar contexto, decisiones y continuidad operativa entre
          conversaciones, herramientas y tiempo.
        </p>
        <p className="text-white/75 text-[15px] leading-relaxed mb-3">
          Trabajamos con el usuario, no sobre el usuario.
        </p>
        <p className="text-white/75 text-[15px] leading-relaxed">
          La soberanía del usuario no es una promesa de marketing.
          Es una restricción estructural del sistema.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-xl font-semibold mb-4">Por qué ahora</h2>
        <ul className="space-y-3 text-white/75 text-[15px] leading-relaxed list-disc list-inside marker:text-white/40">
          <li>La adopción de herramientas IA continúa acelerándose.</li>
          <li>El reset de contexto entre sesiones se volvió una fricción visible y recurrente.</li>
          <li>Las soluciones actuales ayudan a organizar información, pero no preservan continuidad real entre herramientas y sesiones.</li>
          <li>Hasta ahora, la continuidad entre herramientas depende casi completamente de intervención manual del usuario.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-xl font-semibold mb-4">Defensibilidad</h2>
        <p className="text-white/75 text-[15px] leading-relaxed mb-3">
          Cada interacción fortalece la continuidad operativa del usuario a través del tiempo.
        </p>
        <p className="text-white/75 text-[15px] leading-relaxed">
          La arquitectura base de paradaise.id y sus mecanismos de continuidad contextual se encuentran
          en proceso de protección intelectual en Estados Unidos con estrategia de cobertura internacional.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-xl font-semibold mb-4">Equipo</h2>
        <p className="text-white/75 text-[15px] leading-relaxed">
          El equipo fundador cuenta con experiencia previa en construcción de productos,
          propiedad intelectual y desarrollo de startups con operaciones y procesos de aceleración
          en Latinoamérica y Europa.
        </p>
      </section>

      <section className="mb-12 p-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.04]">
        <h2 className="text-white text-xl font-semibold mb-3">Estado actual</h2>
        <ul className="space-y-2 text-white/75 text-[15px] leading-relaxed list-disc list-inside marker:text-cyan-300/60">
          <li>MVP v0 y waitlist operando</li>
          <li>Piloto interno activo</li>
          <li>Desarrollo activo de arquitectura y mecanismos de continuidad contextual</li>
          <li>Conversaciones abiertas con inversionistas estratégicos seleccionados</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-white text-xl font-semibold mb-4">Contacto</h2>
        <p className="text-white/75 text-[15px] leading-relaxed mb-5">
          Si quieres explorar inversión o acceso temprano, escríbenos.
        </p>
        <a
          href="mailto:hello@paradaise.id?subject=Inversionista%20%E2%80%94%20paradaise.id"
          className="inline-flex items-center px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-white/90 transition-opacity"
        >
          hello@paradaise.id
        </a>
      </section>
    </article>
  );
}
