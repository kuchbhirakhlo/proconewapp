import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    // Notepad theme gradients
    'from-slate-900', 'to-slate-800',
    'from-emerald-950', 'to-emerald-900',
    'from-blue-950', 'to-blue-900',
    'from-purple-950', 'to-purple-900',
    'from-rose-950', 'to-rose-900',
    'from-amber-950', 'to-amber-900',
    'from-cyan-950', 'to-cyan-900',
    'from-green-950', 'to-green-900',
    // Notepad theme editor backgrounds
    'bg-slate-800/50',
    'bg-emerald-900/40',
    'bg-blue-900/40',
    'bg-purple-900/40',
    'bg-rose-900/40',
    'bg-amber-900/40',
    'bg-cyan-900/40',
    'bg-green-900/40',
    // Notepad theme borders
    'border-slate-700',
    'border-emerald-800',
    'border-blue-800',
    'border-purple-800',
    'border-rose-800',
    'border-amber-800',
    'border-cyan-800',
    'border-green-800',
    // Create page gradient cards (used in THEME_COLORS preview)
    'from-indigo-500', 'to-indigo-600',
    'from-emerald-500', 'to-emerald-600',
    'from-blue-500', 'to-blue-600',
    'from-purple-500', 'to-purple-600',
    'from-rose-500', 'to-rose-600',
    'from-amber-500', 'to-amber-600',
    'from-cyan-500', 'to-cyan-600',
    'from-green-500', 'to-green-600',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			slideUp: {
    				from: {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			fadeOut: {
    				to: {
    					opacity: '0',
    					visibility: 'hidden'
    				}
    			},
    			'spin-slow': {
    				from: {
    					transform: 'rotate(0deg)'
    				},
    				to: {
    					transform: 'rotate(360deg)'
    				}
    			},
    			'spin-reverse': {
    				from: {
    					transform: 'rotate(360deg)'
    				},
    				to: {
    					transform: 'rotate(0deg)'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			slideUp: 'slideUp 0.8s ease-out',
    			fadeOut: 'fadeOut 0.5s ease-in-out forwards',
    			'spin-slow': 'spin-slow 20s linear infinite',
    			'spin-reverse': 'spin-reverse 25s linear infinite'
    		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;