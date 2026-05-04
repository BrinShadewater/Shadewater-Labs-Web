import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        bg: "hsl(var(--bg) / <alpha-value>)",
        frame: "hsl(var(--frame) / <alpha-value>)",
        frame2: "hsl(var(--frame-2) / <alpha-value>)",
        glow: "hsl(var(--glow) / <alpha-value>)",
        background: { 
          DEFAULT: "hsl(var(--background))", 
          elevated: "hsl(var(--background-elevated))", 
          card: "hsl(var(--background-card))" 
        },
        foreground: { 
          DEFAULT: "hsl(var(--foreground))", 
          muted: "hsl(var(--foreground-muted))" 
        },
        primary: { 
          DEFAULT: "hsl(var(--primary))", 
          glow: "hsl(var(--primary-glow))", 
          foreground: "hsl(var(--primary-foreground))" 
        },
        secondary: { 
          DEFAULT: "hsl(var(--secondary))", 
          glow: "hsl(var(--secondary-glow))", 
          foreground: "hsl(var(--secondary-foreground))" 
        },
        destructive: { 
          DEFAULT: "hsl(var(--destructive))", 
          foreground: "hsl(var(--destructive-foreground))" 
        },
        muted: { 
          DEFAULT: "hsl(var(--muted))", 
          foreground: "hsl(var(--muted-foreground))" 
        },
        accent: { 
          DEFAULT: "hsl(var(--accent))", 
          foreground: "hsl(var(--accent-foreground))" 
        },
        popover: { 
          DEFAULT: "hsl(var(--popover))", 
          foreground: "hsl(var(--popover-foreground))" 
        },
        card: { 
          DEFAULT: "hsl(var(--card))", 
          foreground: "hsl(var(--card-foreground))" 
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      boxShadow: {
        'glow-sm': '0 0 10px hsl(var(--primary-glow) / 0.3)',
        'glow-md': '0 0 20px hsl(var(--primary-glow) / 0.4)',
        'glow-lg': '0 0 30px hsl(var(--primary-glow) / 0.5)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-in": { from: { opacity: "0", transform: "translateX(-10px)" }, to: { opacity: "1", transform: "translateX(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in": "slide-in 0.3s ease-out forwards",
      },
      boxShadow: {
        'glow-sm': '0 0 18px hsl(var(--glow) / 0.30)',
        'glow-md': '0 0 25px hsl(var(--glow) / 0.35)',
        'glow-lg': '0 0 40px hsl(var(--glow) / 0.40)',
        'glow-primary': '0 0 30px hsl(var(--primary) / 0.35)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
