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
        <p className="text-white/55 text-sm">Última actualización: 19 de mayo de 2026</p>
      </header>

      <div className="space-y-8 text-white/75 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Quién es responsable</h2>
          <p>
            paradaise.id es operado por <strong className="text-white/90">Somos Originales S.A.P.I. de C.V.</strong>,
            con domicilio en Ciudad de México, México. Si tienes dudas sobre cómo tratamos tus datos,
            escríbenos a <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">hello@paradaise.id</a>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Qué guardamos</h2>
          <p className="mb-3">
            Únicamente lo que tú decides compartir desde el panel de paradaise. Cada flujo (conversaciones con IA,
            notas, búsquedas, continuidad entre herramientas) es un toggle separado que tú controlas. No capturamos
            nada sin tu consentimiento explícito y granular.
          </p>
          <p>
            Para la lista de espera guardamos únicamente tu correo electrónico y el idioma de tu sesión.
            Nada más.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Qué hacemos con tus datos</h2>
          <p className="mb-3">
            Los usamos para devolverte continuidad — conectar lo que dijiste hoy con lo que decidiste antes,
            sin que tengas que recordarlo. Los datos viven contigo. paradaise sólo los lee con tu permiso para
            mostrarte conexiones útiles.
          </p>
          <p>
            <strong className="text-white/90">No vendemos ni transferimos tus datos personales a terceros.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Tus derechos</h2>
          <p className="mb-3">Tienes derecho a:</p>
          <ul className="space-y-2 list-disc list-inside marker:text-white/40">
            <li>Acceder a todo lo que paradaise tiene de ti.</li>
            <li>Modificar o corregir cualquier dato.</li>
            <li>Revocar tu consentimiento en cualquier momento desde tu panel.</li>
            <li>Solicitar la eliminación completa de tu información.</li>
          </ul>
          <p className="mt-3">
            Para ejercer cualquiera de estos derechos, escríbenos a <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">hello@paradaise.id</a>.
            Respondemos en menos de 72 horas.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Promesa de borrado</h2>
          <p>
            Cuando solicitas eliminar tu cuenta, tus datos personales se borran de nuestros sistemas
            en un plazo máximo de <strong className="text-white/90">60 a 120 días</strong>. Este periodo cubre
            backups encriptados que se rotan automáticamente. Pasado ese plazo, no queda rastro.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Menores de edad</h2>
          <p>
            paradaise.id puede usarse a partir de los 14 años con autorización de un adulto responsable.
            Uno de los objetivos del producto es contribuir al aprendizaje y al desarrollo personal,
            por lo que el uso por menores requiere acompañamiento.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Cambios a esta política</h2>
          <p>
            Si esta política cambia, te avisamos por correo antes de que entre en vigor. Nunca aplicamos
            cambios retroactivos sin tu consentimiento.
          </p>
        </section>
      </div>
    </article>
  );
}
