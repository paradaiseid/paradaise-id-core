import Link from "next/link";

export const metadata = {
  title: "Página no encontrada — paradaise.id",
};

export default function NotFound() {
  return (
    <article className="flex-1 max-w-xl mx-auto w-full px-5 sm:px-6 py-20 sm:py-28 text-center">
      <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">404</p>
      <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-4">
        Esta página no existe — todavía.
      </h1>
      <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10">
        paradaise está en construcción activa. Si seguiste un enlace que te trajo aquí,
        probablemente cambió de lugar o aún no se publica.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-white/90 transition-opacity"
        >
          Volver al inicio
        </Link>
        <Link
          href="/manifesto"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm border border-white/20 text-white/80 hover:border-white/40 transition-colors"
        >
          Leer el manifiesto
        </Link>
      </div>
    </article>
  );
}
