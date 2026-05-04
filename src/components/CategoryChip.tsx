interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  activeClassName?: string;
  inactiveClassName?: string;
}

export default function CategoryChip({
  label,
  active = false,
  onClick,
  activeClassName,
  inactiveClassName,
}: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? activeClassName ?? 'bg-[hsl(192_29%_21%)] text-primary-foreground shadow-[0_0_20px_hsl(192_40%_30%/0.3)]'
        : inactiveClassName ?? 'bg-[hsl(220_20%_13%)] text-foreground-muted border-2 border-border hover:border-[hsl(192_29%_21%)]/40 hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}
