import { useEffect, useRef, useState } from 'react';

interface AnimatedStatProps {
  value: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

export default function AnimatedStat({ value, label, suffix = '', icon }: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observedNode = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (observedNode) {
      observer.observe(observedNode);
    }

    return () => {
      if (observedNode) {
        observer.unobserve(observedNode);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 3500; // 3.5 seconds - slower
    const startTime = Date.now();

    // Ease-out cubic function for smooth deceleration
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing function
      const easedProgress = easeOutCubic(progress);
      const currentCount = Math.floor(value * easedProgress);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value); // Ensure we hit the exact final value
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div ref={ref} className="flex items-center gap-3 rounded-full border-2 border-border bg-[hsl(220_20%_13%)] px-6 py-3">
      {icon}
      <span className="text-foreground-muted text-sm">{label}</span>
      <span className="font-bold text-[hsl(192_40%_35%)] text-lg">
        {formatNumber(count)}{suffix}
      </span>
    </div>
  );
}
