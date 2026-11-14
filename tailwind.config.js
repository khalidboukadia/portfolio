/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm off-white paper — the base of the whole site.
        paper: "#F8F8F6",
        ink: {
          DEFAULT: "#111111",
          soft: "#222222",
          mute: "#6B7280",
          faint: "#9CA3AF",
        },
        // Deep crimson — used sparingly, like an editorial accent.
        crimson: {
          DEFAULT: "#B00020",
          soft: "rgba(176, 0, 32, 0.07)",
          line: "rgba(176, 0, 32, 0.22)",
        },
        hair: "rgba(0, 0, 0, 0.08)",
        amber: "#FCD34D",
      },
      fontFamily: {
        // Satoshi stand-in — geometric humanist sans with a large x-height.
        sans: [
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Editorial serif — section labels and display accents.
        serif: ["Playfair Display", "ui-serif", "Georgia", "Cambria", "serif"],
        // Wide-tracked mono — eyebrows, indices, technical labels.
        mono: ["Azeret Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        display: "-0.04em",
        label: "0.14em",
      },
      maxWidth: {
        shell: "1120px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
