"use client";

import FadeIn from "./FadeIn";

interface WorkCardProps {
  title: string;
  description: string;
  stack: string;
  url?: string;
  github?: string;
  delay?: number;
}

export default function WorkCard({
  title,
  description,
  stack,
  url,
  github,
  delay = 0,
}: WorkCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="card-washi p-6 sm:p-8 h-full flex flex-col">
        {/* Placeholder image area */}
        <div className="w-full aspect-video bg-mist-gray/50 rounded-sm mb-6 flex items-center justify-center">
          <span className="text-washi-white/20 text-body-sm">Image</span>
        </div>

        <h3 className="heading-jp text-heading-md text-washi-white mb-3">
          {title}
        </h3>

        <p className="text-body-sm text-washi-white/60 mb-4 flex-grow">
          {description}
        </p>

        <div className="mt-auto">
          <p className="text-[0.75rem] text-kin-gold/60 tracking-wide mb-4">
            {stack}
          </p>

          <div className="flex gap-4">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-kin-gold hover:text-kin-gold/70 transition-colors"
              >
                Visit →
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-washi-white/50 hover:text-washi-white/70 transition-colors"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
