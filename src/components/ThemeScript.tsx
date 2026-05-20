/**
 * ThemeScript — corre antes de hidratacion para evitar flash blanco/negro.
 * Lee localStorage o respeta prefers-color-scheme.
 */

const SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem('paradaise-theme');
    var theme = stored;
    if (!theme) {
      // si el usuario NO ha elegido, respetamos el preferred del sistema
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
