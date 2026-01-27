/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit_400Regular"],
        "outfit-medium": ["Outfit_500Medium"],
        "outfit-bold": ["Outfit_700Bold"],
      },
      colors: {
        primary: "#4F46E5", // Indigo-600
        accent: "#06B6D4", // Cyan-500
        background: "#F9FAFB", // Gray-50
        surface: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
