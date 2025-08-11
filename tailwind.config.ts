import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
				display: [
					"Montserrat",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0", opacity: "0" },
					to: {
						height: "var(--radix-accordion-content-height)",
						opacity: "1",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
						opacity: "1",
					},
					to: { height: "0", opacity: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.98)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"scale-out": {
					from: { transform: "scale(1)", opacity: "1" },
					to: { transform: "scale(0.98)", opacity: "0" },
				},
				"slide-in-right": {
					"0%": { transform: "translateX(100%)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
				"slide-out-right": {
					"0%": { transform: "translateX(0)", opacity: "1" },
					"100%": { transform: "translateX(100%)", opacity: "0" },
				},
				"light-sweep": {
					"0%": { transform: "translateX(-200%)", opacity: "0.0" },
					"30%": { opacity: "0.35" },
					"100%": { transform: "translateX(300%)", opacity: "0.0" },
				},
				"hero-slide-up": {
					"0%": { transform: "translateY(30px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"hero-slide-right": {
					"0%": { transform: "translateX(50px)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
				"hero-scale": {
					"0%": { transform: "scale(0.9)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"water-ripple": {
					"0%": { transform: "scale(1)", opacity: "0.7" },
					"100%": { transform: "scale(1.5)", opacity: "0" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"water-flow": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
				bubble: {
					"0%": { transform: "translateY(100vh) scale(0)", opacity: "0" },
					"10%": { opacity: "1" },
					"90%": { opacity: "1" },
					"100%": { transform: "translateY(-100px) scale(1)", opacity: "0" },
				},
				"morphing-blob": {
					"0%, 100%": {
						borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
					},
					"50%": {
						borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
					},
				},
				tilt: {
					"0%, 50%, 100%": { transform: "rotate(0deg)" },
					"25%": { transform: "rotate(1deg)" },
					"75%": { transform: "rotate(-1deg)" },
				},
				"pulse-glow": {
					"0%, 100%": {
						boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
					},
					"50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.3s ease-out",
				"accordion-up": "accordion-up 0.3s ease-out",
				"fade-in": "fade-in 0.4s ease-out both",
				"fade-out": "fade-out 0.4s ease-out both",
				"scale-in": "scale-in 0.25s ease-out",
				"scale-out": "scale-out 0.25s ease-out",
				"slide-in-right": "slide-in-right 0.45s ease-out both",
				"slide-out-right": "slide-out-right 0.35s ease-out both",
				"light-sweep": "light-sweep 2.8s ease-in-out infinite",
				"hero-slide-up": "hero-slide-up 0.8s ease-out both",
				"hero-slide-right": "hero-slide-right 0.8s ease-out both",
				"hero-scale": "hero-scale 0.6s ease-out both",
				"water-ripple": "water-ripple 2s ease-out infinite",
				float: "float 3s ease-in-out infinite",
				"water-flow": "water-flow 8s linear infinite",
				bubble: "bubble 6s ease-in-out infinite",
				"morphing-blob": "morphing-blob 8s ease-in-out infinite",
				tilt: "tilt 10s ease-in-out infinite",
				"pulse-glow": "pulse-glow 3s ease-in-out infinite",
				enter: "fade-in 0.4s ease-out, scale-in 0.25s ease-out",
				exit: "fade-out 0.4s ease-out, scale-out 0.25s ease-out",
			},
		},
	},
	plugins: [animate],
} satisfies Config;
