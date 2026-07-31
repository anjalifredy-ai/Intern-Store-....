import { Star } from "lucide-react";

export default function Rating({
  value,
  size = 12,
  showValue = true,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {showValue && (
        <span className="text-xs text-subink mr-0.5">{value.toFixed(1)}</span>
      )}
      <Star size={size} className="fill-subink text-subink" />
    </div>
  );
}
