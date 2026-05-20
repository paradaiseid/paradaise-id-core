export const metadata = {
  title: "Privacy — paradaise.id",
  description: "How paradaise.id treats your data. Sovereignty, not surveillance.",
};

export default function PrivacyEnPage() {
  return (
    <article className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Privacy</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-3">
          Sovereignty, not surveillance.
        </h1>
        <p className="text-white/55 text-sm">Last updated: May 20, 2026</p>
      </header>

      <div className="space-y-8 text-white/75 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Who is responsible</h2>
          <p>
            paradaise.id is operated by{" "}
            <strong className="text-white/90">Somos Originales S.A.P.I. de C.V.</strong>,
            domiciled in Mexico City, Mexico. If you have questions about how we treat
            your data, write to{" "}
            <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">
              hello@paradaise.id
            </a>
            .
          </p>
          <p className="mt-3">
            This policy is governed by Mexico&apos;s Federal Law on the Protection of
            Personal Data Held by Private Parties (LFPDPPP). The rights described below
            correspond to the <strong className="text-white/90">ARCO</strong> rights
            (Access, Rectification, Cancellation, Opposition).
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">What we keep</h2>
          <p className="mb-3">
            Only what you decide to activate from the paradaise panel. Each flow
            (notes, searches, continuity across tools) works as an independent control
            that you manage.
          </p>
          <p className="mb-3">
            Some flows are essential for paradaise to make sense — without{" "}
            <em>continuity across AI conversations</em>, there is no product. When a
            flow is essential, we tell you clearly and you can choose not to use
            paradaise at all. We never activate it without telling you.
          </p>
          <p>For the waitlist we keep only:</p>
          <ul className="list-disc list-inside marker:text-white/40 mt-2 space-y-1">
            <li>your email address,</li>
            <li>the language of your session.</li>
          </ul>
          <p className="mt-3">Nothing more.</p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">What we do with your data</h2>
          <p className="mb-3">
            Your data does not exist to feed advertising. It exists to give you back
            continuity.
          </p>
          <p className="mb-3">
            paradaise only processes what you activate to help you connect decisions,
            ideas, and context between sessions.
          </p>
          <p>
            <strong className="text-white/90">
              We do not sell or transfer your personal data to third parties for
              commercial purposes.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Sub-processors</h2>
          <p className="mb-3">
            To operate, paradaise.id uses the following technology providers. None of
            them has access to the content of your personal continuity — only to the
            infrastructure needed for paradaise to function:
          </p>
          <ul className="list-disc list-inside marker:text-white/40 space-y-1">
            <li>
              <strong className="text-white/90">Vercel</strong> — hosting and site
              delivery.
            </li>
            <li>
              <strong className="text-white/90">Neon</strong> — database (encrypted
              Postgres at rest).
            </li>
            <li>
              <strong className="text-white/90">Clerk</strong> — account authentication
              (when enabled).
            </li>
            <li>
              <strong className="text-white/90">Resend</strong> — transactional email
              delivery.
            </li>
            <li>
              <strong className="text-white/90">Sentry</strong> — technical error
              monitoring.
            </li>
            <li>
              <strong className="text-white/90">Cloudflare</strong> — DNS and inbound
              email routing.
            </li>
          </ul>
          <p className="mt-3">
            Each one complies with their own security standards (SOC 2, ISO 27001, or
            equivalents). If this list changes, we tell you in advance.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Cookies and monitoring</h2>
          <p>
            We use cookies strictly necessary for authentication and technical monitoring
            of the application (detecting errors and outages). We do not use advertising
            cookies or cross-site tracking. We do not sell profiles to data brokers.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Your rights (ARCO)</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="space-y-2 list-disc list-inside marker:text-white/40">
            <li>
              <strong className="text-white/90">Access</strong> — see everything
              paradaise has about you.
            </li>
            <li>
              <strong className="text-white/90">Rectification</strong> — modify or
              correct any data.
            </li>
            <li>
              <strong className="text-white/90">Cancellation</strong> — request the
              complete deletion of your information.
            </li>
            <li>
              <strong className="text-white/90">Opposition</strong> — revoke your
              consent at any time from your panel.
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, write to{" "}
            <a href="mailto:hello@paradaise.id" className="text-cyan-300 hover:underline">
              hello@paradaise.id
            </a>
            . We respond in less than{" "}
            <strong className="text-white/90">72 hours</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Deletion promise</h2>
          <p>
            Active data is deleted immediately. Encrypted backups disappear automatically
            within a maximum of <strong className="text-white/90">120 days</strong>.
            After that period, no trace remains.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Minors</h2>
          <p className="mb-3">paradaise.id is not directed at children under 13.</p>
          <p>
            Between 13 and 17 years old, use requires express consent from a parent or
            guardian. One of the product&apos;s goals is to contribute to learning and
            personal development, so use by minors requires accompaniment by a
            responsible adult.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Security measures</h2>
          <p>
            Encryption of data in transit (TLS) and at rest. Internal access restricted
            to authorized personnel of Somos Originales S.A.P.I. de C.V. Automatic anomaly
            monitoring. The administrative, technical, and physical measures applied by
            paradaise.id comply with the reasonable standards required by the LFPDPPP.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Changes to this policy</h2>
          <p>
            If this policy changes, we notify you by email before it takes effect. We
            never apply retroactive changes without your consent.
          </p>
        </section>
      </div>
    </article>
  );
}
