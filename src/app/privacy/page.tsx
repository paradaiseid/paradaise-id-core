export const metadata = {
  title: "Privacidad — paradaise.id",
  description: "Cómo paradaise.id trata tus datos. Soberanía, no vigilancia.",
};

export default function PrivacyPage() {
  return (
    <article className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Privacidad</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-3">
          Soberanía, no vigilancia.
        </h1>
        <p className="text-white/55 text-sm">Última actualización: 20 de mayo de 2026</p>
      </header>

      <div className="space-y-8 text-white/75 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Quién es responsable</h2>
          <p>
            paradaise.id es operado por{" "}
            <strong className="text-white/90">Somos Originales S.A.P.I. de C.V.</strong>, con
            domicilio en Ciudad de México, México. Si tienes dudas sobre cómo tratamos tus datos,
            escríbenos a{" "}
            <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">
              hello@paradaise.id
            </a>
            .
          </p>
          <p className="mt-3">
            Esta política se rige por la Ley Federal de Protección de Datos Personales en Posesión
            de los Particulares (LFPDPPP) de México. Los derechos descritos abajo corresponden a
            los derechos <strong className="text-white/90">ARCO</strong> (Acceso, Rectificación,
            Cancelación, Oposición).
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Qué guardamos</h2>
          <p className="mb-3">
            Únicamente lo que tú decides activar desde el panel de paradaise. Cada flujo (notas,
            búsquedas, continuidad entre herramientas) funciona como un control independiente que
            tú manejas.
          </p>
          <p className="mb-3">
            Algunos flujos son esenciales para que paradaise tenga sentido — sin{" "}
            <em>continuidad entre conversaciones con IA</em>, no hay producto. Cuando un flujo es
            esencial, te lo decimos claramente y tienes la opción de no usar paradaise en
            absoluto. Nunca lo activamos sin avisarte.
          </p>
          <p>Para la lista de espera guardamos únicamente:</p>
          <ul className="list-disc list-inside marker:text-white/40 mt-2 space-y-1">
            <li>tu correo electrónico,</li>
            <li>el idioma de tu sesión.</li>
          </ul>
          <p className="mt-3">Nada más.</p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Qué hacemos con tus datos</h2>
          <p className="mb-3">
            Tus datos no existen para alimentar publicidad. Existen para devolverte continuidad.
          </p>
          <p className="mb-3">
            paradaise solo procesa lo que activas para ayudarte a conectar decisiones, ideas y
            contexto entre sesiones.
          </p>
          <p>
            <strong className="text-white/90">
              No vendemos ni transferimos tus datos personales a terceros con fines comerciales.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Sub-procesadores</h2>
          <p className="mb-3">
            Para operar, paradaise.id usa los siguientes proveedores tecnológicos. Ninguno tiene
            acceso al contenido de tu continuidad personal — solo a la infraestructura necesaria
            para que paradaise funcione:
          </p>
          <ul className="list-disc list-inside marker:text-white/40 space-y-1">
            <li>
              <strong className="text-white/90">Vercel</strong> — hosting y entrega del sitio.
            </li>
            <li>
              <strong className="text-white/90">Neon</strong> — base de datos (Postgres
              encriptado en reposo).
            </li>
            <li>
              <strong className="text-white/90">Clerk</strong> — autenticación de cuentas
              (cuando se habilite).
            </li>
            <li>
              <strong className="text-white/90">Resend</strong> — envío de correos
              transaccionales.
            </li>
            <li>
              <strong className="text-white/90">Sentry</strong> — monitoreo técnico de errores.
            </li>
            <li>
              <strong className="text-white/90">Cloudflare</strong> — DNS y enrutamiento de
              correo entrante.
            </li>
          </ul>
          <p className="mt-3">
            Cada uno cumple con sus propios estándares de seguridad (SOC 2, ISO 27001 o
            equivalentes). Si esta lista cambia, te avisamos antes.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Cookies y monitoreo</h2>
          <p>
            Usamos cookies estrictamente necesarias para autenticación y monitoreo técnico de la
            aplicación (detectar errores y caídas). No usamos cookies de publicidad ni de rastreo
            cross-site. No vendemos perfiles a brokers de datos.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Tus derechos (ARCO)</h2>
          <p className="mb-3">Tienes derecho a:</p>
          <ul className="space-y-2 list-disc list-inside marker:text-white/40">
            <li>
              <strong className="text-white/90">Acceso</strong> — ver todo lo que paradaise tiene
              de ti.
            </li>
            <li>
              <strong className="text-white/90">Rectificación</strong> — modificar o corregir
              cualquier dato.
            </li>
            <li>
              <strong className="text-white/90">Cancelación</strong> — solicitar la eliminación
              completa de tu información.
            </li>
            <li>
              <strong className="text-white/90">Oposición</strong> — revocar tu consentimiento
              en cualquier momento desde tu panel.
            </li>
          </ul>
          <p className="mt-3">
            Para ejercer cualquiera de estos derechos, escríbenos a{" "}
            <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">
              hello@paradaise.id
            </a>
            . Respondemos en menos de <strong className="text-white/90">72 horas</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Promesa de borrado</h2>
          <p>
            Los datos activos se eliminan inmediatamente. Los backups encriptados desaparecen
            automáticamente en un máximo de <strong className="text-white/90">120 días</strong>.
            Pasado ese plazo, no queda rastro.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Menores de edad</h2>
          <p className="mb-3">paradaise.id no está dirigido a menores de 13 años.</p>
          <p>
            Entre 13 y 17 años, el uso requiere consentimiento expreso de un padre o tutor.
            Uno de los objetivos del producto es contribuir al aprendizaje y al desarrollo
            personal, por lo que el uso por menores requiere acompañamiento de un adulto
            responsable.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Medidas de seguridad</h2>
          <p>
            Encriptación de datos en tránsito (TLS) y en reposo. Acceso interno restringido al
            personal autorizado de Somos Originales S.A.P.I. de C.V. Monitoreo automático de
            anomalías. Las medidas administrativas, técnicas y físicas que aplica paradaise.id
            cumplen con los estándares razonables exigidos por la LFPDPPP.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Cambios a esta política</h2>
          <p>
            Si esta política cambia, te avisamos por correo antes de que entre en vigor. Nunca
            aplicamos cambios retroactivos sin tu consentimiento.
          </p>
        </section>
      </div>
    </article>
  );
}
