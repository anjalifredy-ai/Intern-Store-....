import Image from "next/image";

const COLORS = [
  "from-emerald-400 to-teal-600",
  "from-indigo-400 to-blue-600",
  "from-rose-400 to-pink-600",
  "from-amber-400 to-orange-600",
  "from-violet-400 to-purple-600",
  "from-cyan-400 to-sky-600",
];

function colorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function AppIcon({
  name,
  iconUrl,
  size = 56,
}: {
  name: string;
  iconUrl?: string;
  size?: number;
}) {
  if (iconUrl) {
    return (
      <div
        className="relative overflow-hidden rounded-tile shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src={iconUrl}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
    );
  }

  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const gradient = colorForName(name);

  return (
    <div
      className={`shrink-0 rounded-tile bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-display font-semibold`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initial}
    </div>
  );
}
