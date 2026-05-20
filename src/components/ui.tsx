"use client";

import { ReactNode } from "react";

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  small = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  small?: boolean;
  type?: "button" | "submit";
}) {
  const base = "rounded-full font-medium transition-all";
  const sz = small ? "px-5 py-2 text-xs" : "px-6 sm:px-8 py-3 text-sm";
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed",
    secondary: "bg-transparent text-white/85 border border-white/20 hover:border-white/50 hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed",
  } as const;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sz} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export function Pill({
  children,
  selected,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-full text-[13px] transition-all border ${
        selected
          ? "bg-white text-black border-white"
          : "bg-white/[0.02] text-white/75 border-white/15 hover:border-white/40 hover:bg-white/[0.05]"
      } ${disabled ? "cursor-default opacity-90" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

export function Reveal({
  shown,
  className,
  children,
}: {
  shown: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-500 overflow-hidden ${className ?? ""}`}
      style={{
        maxHeight: shown ? "240px" : "0px",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {children}
    </div>
  );
}

export function CardEnhanced({
  label,
  children,
  className = "mb-3",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-4 rounded-lg bg-cyan-300/[0.06] border border-cyan-300/25 ${className}`} style={{ color: "rgba(190,225,255,0.95)" }}>
      <div className="text-[10px] uppercase tracking-[0.12em] opacity-60 mb-2">{label}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function AccordionItem({ label, children, last = false }: { label: string; children: ReactNode; last?: boolean }) {
  return (
    <div className={last ? "" : "mb-4"}>
      <div className="text-white/50 text-xs uppercase tracking-wider mb-2">{label}</div>
      <div className="text-white/80 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
