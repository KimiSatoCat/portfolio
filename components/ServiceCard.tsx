"use client";

import FadeIn from "./FadeIn";
import { Link } from "@/i18n/routing";

interface ServiceCardProps {
  title: string;
  description: string;
  detail?: string;
  cta: string;
  ctaHref?: string;
  externalHref?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  detail,
  cta,
  ctaHref,
  externalHref,
  delay = 0,
}: ServiceCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="card-washi p-6 sm:p-8 h-full flex flex-col">
        <div className="gold-line mb-6" />

        <h3 className="heading-jp text-heading-md text-washi-white mb-4">
          {title}
        </h3>

        <p className="text-body text-washi-white/60 mb-4 flex-grow">
          {description}
        </p>

        {detail && (
          <p className="text-body-sm text-kin-gold/60 mb-6">
            {detail}
          </p>
        )}

        <div className="mt-auto">
          {externalHref ? (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-block text-center text-body-sm"
            >
              {cta}
            </a>
          ) : ctaHref ? (
            <Link href={ctaHref} className="btn-beni inline-block text-center text-body-sm">
              {cta}
            </Link>
          ) : null}
        </div>
      </div>
    </FadeIn>
  );
}
