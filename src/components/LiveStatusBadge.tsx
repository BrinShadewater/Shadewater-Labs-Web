interface LiveStatusBadgeProps {
  isLive: boolean;
  viewerCount?: number;
}

export default function LiveStatusBadge({ isLive, viewerCount }: LiveStatusBadgeProps) {
  if (!isLive) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/10 bg-[hsl(220_20%_13%/0.96)] px-4 py-2 text-sm font-medium text-foreground/80 shadow-[0_10px_28px_hsl(210_66%_3%/0.22)]">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-500"></span>
        <span>Stream Offline</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/10 bg-[hsl(220_20%_13%/0.96)] px-4 py-2 text-sm font-medium text-foreground/80 shadow-[0_10px_28px_hsl(210_66%_3%/0.22)]">
      <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
      <span>Stream Online</span>
      {viewerCount ? (
        <span className="text-foreground/65">• {viewerCount} viewers</span>
      ) : null}
    </div>
  );
}
