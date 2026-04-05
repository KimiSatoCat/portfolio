"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { PhotoConfig } from "@/components/PhotoSlot";
import { setPhotoConfig, getAllPhotoConfigs } from "@/components/PhotoSlot";

const SLOTS = [
  {
    id: "about-profile",
    label: "About - プロフィール写真",
    aspect: "aspect-square",
    maxW: "max-w-[224px]",
  },
  {
    id: "about-banner",
    label: "About - バナー写真",
    aspect: "aspect-[21/9]",
    maxW: "max-w-full",
  },
  {
    id: "hero-bg",
    label: "トップ - ヒーロー背景",
    aspect: "aspect-video",
    maxW: "max-w-full",
  },
] as const;

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        setError("パスワードが正しくありません");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sumi-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="heading-jp text-heading-lg text-washi-white text-center mb-8">
          管理者ログイン
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
          <input
            type="text"
            name="username"
            autoComplete="username"
            defaultValue="admin"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
          <div>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワード"
              className="w-full bg-mist-gray/30 border border-kin-gold/20 rounded-sm px-4 py-3 text-washi-white placeholder-washi-white/30 focus:outline-none focus:border-kin-gold/50"
            />
          </div>
          {error && <p className="text-beni-red text-body-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-beni w-full disabled:opacity-50"
          >
            {loading ? "..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}

function SlotEditor({
  slot,
  photos,
  config,
  onSave,
}: {
  slot: (typeof SLOTS)[number];
  photos: string[];
  config: PhotoConfig | null;
  onSave: (id: string, config: PhotoConfig) => void;
}) {
  const [src, setSrc] = useState(config?.src || "");
  const [posX, setPosX] = useState(config?.posX ?? 50);
  const [posY, setPosY] = useState(config?.posY ?? 50);
  const [scale, setScale] = useState(config?.scale ?? 1);
  const [isDragging, setIsDragging] = useState(false);

  const handleSave = () => {
    if (!src) return;
    onSave(slot.id, { src, posX, posY, scale });
  };

  const handleClear = () => {
    setSrc("");
    setPosX(50);
    setPosY(50);
    setScale(1);
    localStorage.removeItem(`photo-config-${slot.id}`);
    window.dispatchEvent(
      new CustomEvent("photo-config-change", { detail: { slotId: slot.id } })
    );
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      setPosX(Math.max(0, Math.min(100, x)));
      setPosY(Math.max(0, Math.min(100, y)));
    },
    [isDragging]
  );

  return (
    <div className="card-washi p-6 space-y-4">
      <h3 className="text-heading-md text-washi-white">{slot.label}</h3>

      {/* Photo selector */}
      <div>
        <label className="text-body-sm text-washi-white/60 block mb-2">写真を選択</label>
        <select
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className="w-full bg-mist-gray/50 border border-kin-gold/20 rounded-sm px-3 py-2 text-washi-white text-body-sm focus:outline-none"
        >
          <option value="">-- 未設定 --</option>
          {photos.map((p) => (
            <option key={p} value={p}>
              {p.replace("/photos/", "")}
            </option>
          ))}
        </select>
      </div>

      {/* Preview + position control */}
      {src && (
        <>
          <div className="space-y-3">
            <p className="text-body-sm text-washi-white/40">
              プレビュー内をドラッグして位置を調整
            </p>
            <div
              className={`relative ${slot.aspect} ${slot.maxW} overflow-hidden rounded-sm border border-kin-gold/30 cursor-crosshair select-none`}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={src}
                alt="Preview"
                fill
                className="object-cover pointer-events-none"
                style={{
                  objectPosition: `${posX}% ${posY}%`,
                  transform: `scale(${scale})`,
                }}
                sizes="600px"
              />
              {/* Crosshair indicator */}
              <div
                className="absolute w-4 h-4 border-2 border-kin-gold rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-lg"
                style={{ left: `${posX}%`, top: `${posY}%` }}
              />
            </div>
          </div>

          {/* Position sliders */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-body-sm text-washi-white/40 block mb-1">
                X位置: {posX}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="w-full accent-kin-gold"
              />
            </div>
            <div>
              <label className="text-body-sm text-washi-white/40 block mb-1">
                Y位置: {posY}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="w-full accent-kin-gold"
              />
            </div>
          </div>

          {/* Scale slider */}
          <div>
            <label className="text-body-sm text-washi-white/40 block mb-1">
              ズーム: {scale.toFixed(1)}x
            </label>
            <input
              type="range"
              min={100}
              max={200}
              value={scale * 100}
              onChange={(e) => setScale(Number(e.target.value) / 100)}
              className="w-full accent-kin-gold"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={handleSave} className="btn-beni text-body-sm">
              保存
            </button>
            <button onClick={handleClear} className="btn-outline text-body-sm">
              クリア
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [configs, setConfigs] = useState<Record<string, PhotoConfig>>({});
  const [exportData, setExportData] = useState("");

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    fetch("/api/admin/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data.photos || []));

    setConfigs(getAllPhotoConfigs());
  }, [authenticated]);

  const handleSave = (slotId: string, config: PhotoConfig) => {
    setPhotoConfig(slotId, config);
    setConfigs(getAllPhotoConfigs());
  };

  const handleExport = () => {
    const data = JSON.stringify(getAllPhotoConfigs(), null, 2);
    setExportData(data);
    navigator.clipboard.writeText(data);
  };

  const handleImport = () => {
    const input = prompt("設定JSONを貼り付けてください:");
    if (!input) return;
    try {
      const data = JSON.parse(input) as Record<string, PhotoConfig>;
      Object.entries(data).forEach(([slotId, config]) => {
        setPhotoConfig(slotId, config);
      });
      setConfigs(getAllPhotoConfigs());
    } catch {
      alert("JSONの解析に失敗しました");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-sumi-black flex items-center justify-center">
        <div className="text-washi-white/40">...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-sumi-black text-washi-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-jp text-heading-lg">写真管理</h1>
          <div className="flex gap-3">
            <button onClick={handleExport} className="btn-outline text-body-sm">
              設定をエクスポート
            </button>
            <button onClick={handleImport} className="btn-outline text-body-sm">
              インポート
            </button>
          </div>
        </div>

        {exportData && (
          <div className="card-washi p-4 mb-6">
            <p className="text-body-sm text-kin-gold mb-2">
              クリップボードにコピーしました
            </p>
            <pre className="text-body-sm text-washi-white/60 overflow-x-auto">
              {exportData}
            </pre>
          </div>
        )}

        <p className="text-body-sm text-washi-white/40 mb-8">
          写真を選択し、ドラッグやスライダーで位置・ズームを調整してください。
          設定はこのブラウザに保存されます。
        </p>

        <div className="space-y-8">
          {SLOTS.map((slot) => (
            <SlotEditor
              key={slot.id}
              slot={slot}
              photos={photos}
              config={configs[slot.id] || null}
              onSave={handleSave}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
