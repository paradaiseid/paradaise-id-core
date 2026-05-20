/**
 * ThemeScript — corre antes de hidratacion para evitar flash blanco/negro.
 * Default SIEMPRE oscuro. Solo cambia a light si el usuario lo elige explicitamente.
 */

const SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem('paradaise-theme');
    if (stored === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // si no hay nada guardado o stored === 'dark', dark por default (no se hace nada)
  } catch (e) {}
})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
