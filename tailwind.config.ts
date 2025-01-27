/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},

			//background//
			'color-backgroundPrimary': 'var(--color-backgroundPrimary)',
			'color-backgroundSecondary': 'var(--color-backgroundSecondary)',
			'color-backgroundSuccess': 'var(--color-backgroundSuccess)',
			'color-backgroundError': 'var(--color-backgroundError)',
			'color-backgroundWarning': 'var(--color-backgroundWarning)',
			'color-backgroundInfo': 'var(--color-backgroundInfo)',

			//accent//
			'color-accentPrimary': 'var(--color-accentPrimary)',
			'color-accentSecondary': 'var(--color-accentSecondary)',
			'color-accentSuccess': 'var(--color-accentSuccess)',
			'color-accentWarning': 'var(--color-accentWarning)',
			'color-accentError': 'var(--color-accentError)',
			'color-accentInfo': 'var(--color-accentInfo)',

			//text//
			'color-textPrimary': 'var(--color-textPrimary)',
			'color-textSecondary': 'var(--color-textSecondary)',
			'color-textTertiary': 'var(--color-textTertiary)',
			'color-textDisabled': 'var(--color-textdisabled)',
			'color-textAutoFilled': 'var(--color-textAutoFilled)',

			//border//
			'color-borderPrimary': 'var(--color-borderPrimary)',
			'color-borderSecondary': 'var(--color-borderSecondary)',

			//chart//
			'color-chartBackground': 'var(--color-chartBackground)',
			'color-chartAxisPrimary': 'var(--color-chartAxisPrimary)',
			'color-chartAxisLabel': 'var(--color-chartAxisLabel)',
			'color-chartAxisGrid': 'var(--color-chartAxisGrid)',

			//lowestrank for rfq quotes//
			'color-lowestQuotePrimary': 'var(--color-lowestQuotePrimary)',
			'color-lowestQuoteSecondary': 'var(--color-lowestQuoteSecondary)',
			'color-lowestQuoteTertiary': 'var(--color-lowestQuoteTertiary)',
  		},
  		borderRadius: {
  			lg: '`var(--radius)`',
  			md: '`calc(var(--radius) - 2px)`',
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
