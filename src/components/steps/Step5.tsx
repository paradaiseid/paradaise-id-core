"use client";

import { Btn, CardEnhanced, AccordionItem } from "@/components/ui";
import type { Contexto, Edad } from "./types";
import { labelContexto, truncar } from "./types";

interface Props {
  contexto: Contexto;
  edad: Edad;
  proyecto: string;
  decision: string;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step5({ contexto, edad, proyecto, decision, onNext, onPrev }: Props) {
  const interactuasteLines: string[] = [];
  if (contexto) interactuasteLines.push(`Contexto: ${labelContexto(contexto)}`);
  if (edad) interactuasteLines.push(`Edad: ${edad}`);
  if (proyecto.trim()) interactuasteLines.push(`Proyecto: ${proyecto.trim()}`);
  if (decision.trim()) interactuasteLines.push(`En lo que estás pensando: ${decision.trim()}`);

  const e = edad ?? "sin definir";
  let continuidadObservada = "";
  switch (contexto) {
    case "estudio":
      continuidadObservada = `Perfil de estudiante, rango ${e}. paradaise mantiene continuidad entre sesiones de estudio: temas que vuelves a tocar, conexiones entre materias y momentos donde la claridad sube o baja.`;
      break;
    case "empresa":
      continuidadObservada = `Profesional en empresa, rango ${e}. paradaise mantiene continuidad entre proyectos, decisiones que se repiten y conversaciones donde aparece la misma duda en distintos momentos.`;
      break;
    case "freelance":
      continuidadObservada = `Independiente, rango ${e}. paradaise mantiene continuidad entre clientes y proyectos paralelos, devolviéndote el contexto del que estás trabajando ahora sin que tengas que recordar dónde lo dejaste.`;
      break;
    case "founder":
      continuidadObservada = `Fundador, rango ${e}. paradaise mantiene continuidad entre decisiones estratégicas y conversaciones cruzadas — equipo, inversores, producto — para que cada decisión nueva tenga el contexto de la anterior.`;
      break;
    default:
      continuidadObservada = `Perfil ${contexto ? labelContexto(contexto).toLowerCase() : "general"}, rango ${e}. paradaise mantiene continuidad entre tus conversaciones, herramientas y días.`;
  }

  const continuidadRelacionada = proyecto.trim()
    ? `Tema activo: "${proyecto.trim()}". paradaise lo conecta con cualquier otra conversación, búsqueda o nota relacionada — sin que tengas que etiquetarlo cada vez. Cuando vuelvas, recuperas el hilo completo, no fragmentos sueltos.`
    : "Sin un tema específico todavía. paradaise va a detectar el proyecto activo de forma natural a partir de tu uso real y va a conectar las conversaciones que pertenecen al mismo hilo.";

  const mejoras: string[] = [];
  if (decision.trim()) mejoras.push(`Retomar lo que mencionaste ("${truncar(decision.trim(), 60)}") con contexto fresco, en lugar de empezar desde cero la próxima vez.`);
  if (proyecto.trim()) mejoras.push(`Las próximas conversaciones se conectan automáticamente con "${truncar(proyecto.trim(), 40)}".`);
  mejoras.push("Reconocer los momentos del día con más claridad para concentrar decisiones grandes ahí.");
  mejoras.push("Recuperar el hilo de un tema sin tener que releer toda la conversación previa.");

  let critica = "";
  switch (contexto) {
    case "estudio":
      critica = "Mantener un solo tema activo por bloque te da más profundidad que alternar entre varios. paradaise puede avisarte cuando estás saltando demasiado.";
      break;
    case "empresa":
      critica = "Las decisiones que dependen de input de otros tienden a quedar en pausa. paradaise reconoce cuáles llevan días sin movimiento y te las devuelve a la vista.";
      break;
    case "freelance":
      critica = "Tu atención se distribuye entre varios proyectos paralelos. Bloques dedicados a uno solo elevan la calidad del entregable — paradaise te marca cuándo estás repartiéndote demasiado.";
      break;
    case "founder":
      critica = "Las decisiones grandes que se postergan más de 72 horas suelen acumular costo. paradaise reconoce cuándo una decisión está dando vueltas sin cerrarse.";
      break;
    default:
      critica = "paradaise observa qué temas vuelven sin resolverse, y te los devuelve cuando tiene sentido retomarlos.";
  }

  const accion = proyecto.trim()
    ? `Dedica 5 minutos a escribir cuál es el siguiente paso concreto de "${truncar(proyecto.trim(), 40)}". Eso destraba más que pensarlo media hora.`
    : "Dedica 5 minutos a escribir cuál es la próxima decisión que tienes que cerrar. Sacarla de tu cabeza ya la mueve.";

  const continuidadTexto = proyecto.trim()
    ? `Acabas de inaugurar el hilo "${truncar(proyecto.trim(), 40)}" en paradaise. Las próximas conversaciones, búsquedas y notas que toquen este tema se van a anclar aquí automáticamente.`
    : "Esta es tu primera sesión. paradaise empieza a guardar el contexto desde ahora — las próximas interacciones se van a conectar con esta.";

  const señales = [contexto, edad, proyecto.trim() || null, decision.trim() || null].filter(Boolean).length;
  const progreso = `Diste ${señales} ${señales === 1 ? "señal" : "señales"} en esta sesión. paradaise empieza a tener forma propia contigo.`;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">Aquí es donde mejoras</h2>
      <p className="text-white/60 text-sm sm:text-base mb-6 leading-relaxed">Esto es lo que conectas cuando vuelves.</p>

      <CardEnhanced label="Lo que interactuaste">
        {interactuasteLines.length > 0 ? (
          <div className="whitespace-pre-wrap">{interactuasteLines.join("\n")}</div>
        ) : (
          <div className="opacity-60">(Sin contexto todavía — completa el paso anterior.)</div>
        )}
      </CardEnhanced>

      <CardEnhanced label="Continuidad observada">
        <div>{continuidadObservada}</div>
      </CardEnhanced>

      <CardEnhanced label="Continuidad relacionada">
        <div>{continuidadRelacionada}</div>
      </CardEnhanced>

      <CardEnhanced label="Mejoras prácticas sugeridas" className="mb-4">
        <ol className="list-decimal list-inside space-y-1">
          {mejoras.map((m, i) => (<li key={i}>{m}</li>))}
        </ol>
      </CardEnhanced>

      <details className="rounded-xl border border-white/10 bg-white/[0.03] mb-4 group">
        <summary className="cursor-pointer list-none flex items-center justify-between px-5 py-4 select-none">
          <span className="text-white text-sm font-medium">Configuración personalizada</span>
          <span className="text-white/60 text-xs group-open:rotate-180 transition-transform duration-200">▼</span>
        </summary>
        <div className="px-5 pb-5 pt-1 border-t border-white/5">
          <AccordionItem label="Crítica constructiva">{critica}</AccordionItem>
          <AccordionItem label="Acción rápida">{accion}</AccordionItem>
          <AccordionItem label="Continuidad">{continuidadTexto}</AccordionItem>
          <AccordionItem label="Progreso" last>{progreso}</AccordionItem>
        </div>
      </details>

      <p className="text-white/40 text-xs mb-6">Lo que paradaise conecta nunca modifica tu input original.</p>

      <div className="flex gap-3">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
