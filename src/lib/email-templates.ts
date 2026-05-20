// src/lib/email-templates.ts
// Plantillas HTML de los correos transaccionales de paradaise.id
// Doctrina: calm tech, mom-friendly. Sin emojis. Sin urgencia falsa.

export type WaitlistConfirmTemplate = {
  subject: string;
  html: string;
  text: string;
};

export function waitlistConfirmEmail(opts: {
  lang?: "es" | "en";
} = {}): WaitlistConfirmTemplate {
  const lang = opts.lang || "es";

  if (lang === "en") {
    return {
      subject: "Welcome to paradaise",
      html: renderHtml({
        title: "Welcome to paradaise",
        bodyLines: [
          "Hi,",
          "I'm Francisco. Confirming you're on the list.",
          "paradaise comes from a simple idea: life is already too complex to also have to organize it. I'm building an app that helps you without changing anything about your normal life.",
          "I'll let you know when we open access.",
          "— Francisco",
        ],
        footerNote: "You can unsubscribe at any time by replying to this email.",
      }),
      text: [
        "Hi,",
        "",
        "I'm Francisco. Confirming you're on the list.",
        "",
        "paradaise comes from a simple idea: life is already too complex to also have to organize it. I'm building an app that helps you without changing anything about your normal life.",
        "",
        "I'll let you know when we open access.",
        "",
        "— Francisco",
        "",
        "You can unsubscribe at any time by replying to this email.",
      ].join("\n"),
    };
  }

  return {
    subject: "Bienvenido a paradaise",
    html: renderHtml({
      title: "Bienvenido a paradaise",
      bodyLines: [
        "Hola,",
        "Soy Francisco. Te confirmo que entraste a la lista.",
        "paradaise nace de una idea simple: la vida ya es demasiado compleja como para tener que organizarla. Estoy construyendo una app que te ayuda sin que hagas nada distinto a tu vida normal.",
        "Te aviso cuando abramos accesos.",
        "— Francisco",
      ],
      footerNote: "Puedes darte de baja en cualquier momento respondiendo a este correo.",
    }),
    text: [
      "Hola,",
      "",
      "Soy Francisco. Te confirmo que entraste a la lista.",
      "",
      "paradaise nace de una idea simple: la vida ya es demasiado compleja como para tener que organizarla. Estoy construyendo una app que te ayuda sin que hagas nada distinto a tu vida normal.",
      "",
      "Te aviso cuando abramos accesos.",
      "",
      "— Francisco",
      "",
      "Puedes darte de baja en cualquier momento respondiendo a este correo.",
    ].join("\n"),
  };
}

// =====================================================================
// HTML renderer mínimo, sobrio. Inline styles para máxima compat clientes.
// =====================================================================

function renderHtml(opts: {
  title: string;
  bodyLines: string[];
  footerNote?: string;
}): string {
  const paragraphs = opts.bodyLines
    .map(
      (line) =>
        `<p style="margin:0 0 16px 0;color:#0a0a0a;font-size:15px;line-height:1.6;">${escape(
          line
        )}</p>`
    )
    .join("\n");

  const footer = opts.footerNote
    ? `<p style="margin:32px 0 0 0;color:#6a7780;font-size:12px;line-height:1.5;">${escape(
        opts.footerNote
      )}</p>`
    : "";

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escape(opts.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7f9;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;border:1px solid #e6e8eb;">
            <tr>
              <td style="padding:32px 32px 24px 32px;">
                <div style="font-size:13px;color:#0a72c2;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">paradaise.id</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px 32px;">
                ${paragraphs}
                ${footer}
              </td>
            </tr>
          </table>
          <p style="margin:24px 0 0 0;color:#9aa4ae;font-size:11px;">paradaise.id · Somos Originales S.A.P.I. de C.V. · CDMX</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
