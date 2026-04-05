"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface PhotoConfig {
  src: string;
  posX: number; // 0-100 object-position X%
  posY: number; // 0-100 object-position Y%
  scale: number; // 1-2 zoom level
}

interface PhotoSlotProps {
  slotId: string;
  className?: string;
  alt?: string;
  overlay?: boolean;
  priority?: boolean;
}

export function getPhotoConfig(slotId: string): PhotoConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const config = localStorage.getItem(`photo-config-${slotId}`);
    return config ? JSON.parse(config) : null;
  } catch {
    return null;
  }
}

export function setPhotoConfig(slotId: string, config: PhotoConfig) {
  localStorage.setItem(`photo-config-${slotId}`, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent("photo-config-change", { detail: { slotId } }));
}

export function getAllPhotoConfigs(): Record<string, PhotoConfig> {
  const configs: Record<string, PhotoConfig> = {};
  if (typeof window === "undefined") return configs;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("photo-config-")) {
      try {
        configs[key.replace("photo-config-", "")] = JSON.parse(localStorage.getItem(key)!);
      } catch { /* skip */ }
    }
  }
  return configs;
}

export default function PhotoSlot({
  slotId,
  className = "",
  alt = "",
  overlay = false,
  priority = false,
}: PhotoSlotProps) {
  const [config, setConfig] = useState<PhotoConfig | null>(null);

  useEffect(() => {
    setConfig(getPhotoConfig(slotId));

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.slotId === slotId) {
        setConfig(getPhotoConfig(slotId));
      }
    };
    window.addEventListener("photo-config-change", handler);
    return () => window.removeEventListener("photo-config-change", handler);
  }, [slotId]);

  if (!config?.src) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden border border-kin-gold/20 ${className}`}>
      <Image
        src={config.src}
        alt={alt}
        fill
        className="object-cover"
        style={{
          objectPosition: `${config.posX}% ${config.posY}%`,
          transform: `scale(${config.scale || 1})`,
        }}
        sizes="(max-width: 1024px) 100vw, 896px"
        priority={priority}
      />
      {overlay && (
        <div className="absolute inset-0 bg-sumi-black/40" />
      )}
    </div>
  );
}
