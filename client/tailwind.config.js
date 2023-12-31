/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		fontFamily: {
			main: ["Open Sans", "sans-serif;"],
		},
		extend: {
			zIndex: {
				100: "100",
			},
			gridTemplateRows: {
				// Simple 8 row grid
				10: "repeat(10, minmax(0, 1fr))",

				// Complex site-specific row configuration
				layout: "200px minmax(900px, 1fr) 100px",
			},
			gridRow: {
				"span-7": "span 7 / span 7",
			},
			width: {
				main: "1220px",
			},
			backgroundColor: {
				main: "#79AC78",
				overlay: "rgba(0,0,0,0.3)",
			},
			colors: {
				main: "#79AC78",
			},
			flex: {
				2: "2 2 0%",
				3: "3 3 0%",
				4: "4 4 0%",
				5: "5 5 0%",
				6: "6 6 0%",
				7: "7 7 0%",
				8: "8 8 0%",
				9: "9 9 0%",
			},
			keyframes: {
				"slide-top": {
					"0%": {
						"-webkit-transform": "translateY(0);",
						transform: " translateY(20px);",
					},
					"100%": {
						"-webkit-transform": "translateY(-100px);",
						transform: "translateY(0);",
					},
				},
				"slide-top-sm": {
					"0%": {
						"-webkit-transform": "translateY(4px);",
						transform: " translateY(4px);",
					},
					"100%": {
						"-webkit-transform": "translateY(0px);",
						transform: "translateY(0);",
					},
				},
				"slide-right": {
					"0%": {
						"-webkit-transform": "translateX(-1000px);",
						transform: " translateX(-1000px);",
					},
					"100%": {
						"-webkit-transform": "translateX(0);",
						transform: "translateX(0);",
					},
				},
				"slide-left": {
					"0%": {
						"-webkit-transform": "translateX(50px);",
						transform: "translateX(50px);",
					},
					"100%": {
						"-webkit-transform": "translateX(0);",
						transform: "translateX(0);",
					},
				},
				"scale-up-center": {
					"0%": {
						"-webkit-transform": " scale(0.5);",
						transform: " scale(0.5);",
					},
					"100%": {
						"-webkit-transform": "scale(1);",
						transform: "scale(1);",
					},
				},
				"scale-up-hor-left": {
					"0%": {
						"-webkit-transform": "scaleX(0.4);",
						transform: "scaleX(0.4);",
						"-webkit-transform-origin": " 0% 0%;",
						"transform-origin": "0% 0%;",
					},
					"100%": {
						"-webkit-transform": "scaleX(1);",
						transform: " scaleX(1);",
						"-webkit-transform-origin": " 0% 0%;",
						"transform-origin": "0% 0%;",
					},
				},
			},
			animation: {
				"slide-top": "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
				"slide-top-sm": "slide-top-sm 0.2s linear both;",
				"slide-right": "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
				"slide-left": "slide-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
				"scale-up-center": "scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
				"scale-up-hor-left": "scale-up-hor-left 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
			},
			listStyleType: {
				square: "square",
				roman: "upper-roman",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
