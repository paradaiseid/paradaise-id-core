"use client";

import { useState, FormEvent } from "react";

export default function ContactEnPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<"general" | "investor" | "press" | "support">("general");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subj = encodeURIComponent(`[${topic}] ${name || "Contact"} — paradaise.id`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
    );
    window.location.href = `mailto:hello@paradaise.id?subject=${subj}&body=${body}`;
    setSent(true);
  };

  return (
    <article className="flex-1 max-w-xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Contact</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-3">
          Write to us.
        </h1>
        <p className="text-white/55 text-base">
          For specific topics: founders and investors go to{" "}
          <a href="/en/inversionistas" className="text-cyan-300 hover:underline">
            /investors
          </a>
          . For everything else, this form.
        </p>
      </header>

      {sent ? (
        <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/[0.05] p-5 text-cyan-100/95 text-sm leading-relaxed">
          Your email client opened with a pre-filled message. When you send it, we&apos;ll
          reply in under 72 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-xs mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-2">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as typeof topic)}
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
            >
              <option value="general">General</option>
              <option value="investor">Investor</option>
              <option value="press">Press</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-2">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-white/90 transition-opacity"
          >
            Send message
          </button>

          <p className="text-white/40 text-xs pt-2">
            On submit your email app opens with the pre-filled message so you can review
            before sending. We don&apos;t store anything on this page.
          </p>
        </form>
      )}
    </article>
  );
}
