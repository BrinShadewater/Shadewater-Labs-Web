interface StatPillProps {
  label: string;
  value: string;
}

export default function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-3 bg-background-card/60 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
      <span className="text-2xl font-bold text-gradient">{value}</span>
      <span className="text-sm text-foreground-muted font-medium">{label}</span>
    </div>
  );
}
