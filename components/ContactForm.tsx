"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/placeholder", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card-washi p-8 text-center">
        <p className="text-kin-gold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-body-sm text-washi-white/60 mb-2">
          {t("name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-mist-gray/30 border border-kin-gold/20 rounded-sm px-4 py-3 text-washi-white placeholder-washi-white/20 focus:outline-none focus:border-kin-gold/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-body-sm text-washi-white/60 mb-2">
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-mist-gray/30 border border-kin-gold/20 rounded-sm px-4 py-3 text-washi-white placeholder-washi-white/20 focus:outline-none focus:border-kin-gold/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-body-sm text-washi-white/60 mb-2">
          {t("subject")}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full bg-mist-gray/30 border border-kin-gold/20 rounded-sm px-4 py-3 text-washi-white placeholder-washi-white/20 focus:outline-none focus:border-kin-gold/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-body-sm text-washi-white/60 mb-2">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full bg-mist-gray/30 border border-kin-gold/20 rounded-sm px-4 py-3 text-washi-white placeholder-washi-white/20 focus:outline-none focus:border-kin-gold/50 transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-beni-red text-body-sm">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-beni w-full sm:w-auto disabled:opacity-50"
      >
        {status === "sending" ? "..." : t("submit")}
      </button>
    </form>
  );
}
