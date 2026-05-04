import { useEffect, useId, useState } from 'react';

declare global {
  interface Window {
    Twitch?: {
      Player: {
        new (elementId: string, options: Record<string, unknown>): TwitchPlayerInstance;
        ONLINE: string;
        OFFLINE: string;
        READY: string;
      };
    };
  }
}

interface TwitchPlayerInstance {
  addEventListener: (event: string, callback: () => void) => void;
  removeEventListener?: (event: string, callback: () => void) => void;
  setVolume?: (volume: number) => void;
}

type StreamStatus = 'loading' | 'live' | 'offline';

const TWITCH_SCRIPT_ID = 'twitch-player-script';

interface TwitchStreamEmbedProps {
  channel: string;
  onStatusChange?: (status: StreamStatus) => void;
}

function loadTwitchScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.Twitch?.Player) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(TWITCH_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Twitch embed script.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TWITCH_SCRIPT_ID;
    script.src = 'https://player.twitch.tv/js/embed/v1.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Twitch embed script.'));
    document.body.appendChild(script);
  });
}

export default function TwitchStreamEmbed({ channel, onStatusChange }: TwitchStreamEmbedProps) {
  const [status, setStatus] = useState<StreamStatus>('loading');
  const [scriptError, setScriptError] = useState(false);
  const embedId = useId().replace(/:/g, '');

  useEffect(() => {
    let player: TwitchPlayerInstance | null = null;
    let cancelled = false;

    const initializePlayer = async () => {
      try {
        await loadTwitchScript();
        if (cancelled || !window.Twitch?.Player) return;

        const parent = Array.from(new Set([window.location.hostname, 'localhost', '127.0.0.1'].filter(Boolean)));

        player = new window.Twitch.Player(embedId, {
          channel,
          parent,
          autoplay: false,
          muted: false,
          width: '100%',
          height: '100%',
        });

        const handleOnline = () => {
          if (!cancelled) setStatus('live');
        };

        const handleOffline = () => {
          if (!cancelled) setStatus('offline');
        };

        const handleReady = () => {
          player?.setVolume?.(0.65);
        };

        player.addEventListener(window.Twitch.Player.READY, handleReady);
        player.addEventListener(window.Twitch.Player.ONLINE, handleOnline);
        player.addEventListener(window.Twitch.Player.OFFLINE, handleOffline);
      } catch {
        if (!cancelled) {
          setScriptError(true);
          setStatus('offline');
        }
      }
    };

    initializePlayer();

    return () => {
      cancelled = true;
    };
  }, [channel, embedId]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border-2 border-border bg-[hsl(220_20%_13%/0.94)] shadow-[0_18px_45px_hsl(210_66%_3%/0.28)]">
      <div id={embedId} className={`h-full w-full ${status === 'live' ? 'block' : 'hidden'}`} />

      {status !== 'live' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black px-6 text-center">
          <div className="mb-4 text-6xl">📺</div>
          <p className="text-2xl font-bold text-foreground">Stream currently offline</p>
          <p className="mt-2 max-w-xl text-sm text-foreground/60">
            {scriptError
              ? 'The Twitch player could not load right now. You can still catch the channel live on Twitch.'
              : 'When the channel goes live, the Twitch player will appear here automatically.'}
          </p>
        </div>
      )}
    </div>
  );
}
