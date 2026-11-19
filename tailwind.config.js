/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme tokens are CSS variables (see index.css `:root` / `.dark`),
        // so the whole palette flips when the `dark` class is on <html>.
        // Warm off-white paper in light mode, near-black in dark mode.
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        // Card / raised background: white in light, charcoal in dark.
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        // Soft inset panel (#F1F1EC in light, one step up from surface in dark).
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        // Pale rose tint (Laravel card): blush in light, deep wine in dark.
        blush: "rgb(var(--c-blush) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
          mute: "rgb(var(--c-ink-mute) / <alpha-value>)",
          faint: "rgb(var(--c-ink-faint) / <alpha-value>)",
        },
        // Deep crimson in light — used sparingly, like an editorial accent.
        // Brightened in dark mode so it keeps contrast on dark surfaces.
        crimson: {
          DEFAULT: "rgb(var(--c-crimson) / <alpha-value>)",
          soft: "rgb(var(--c-crimson) / 0.07)",
          line: "rgb(var(--c-crimson) / 0.22)",
        },
        hair: "rgb(var(--c-ink) / 0.08)",
        // Stronger border for inputs and controls that need definition.
        hairstrong: "rgb(var(--c-ink) / 0.16)",
        // Status colors (see --c-success / --c-warning in index.css).
        success: "rgb(var(--c-success) / <alpha-value>)",
        warning: "rgb(var(--c-warning) / <alpha-value>)",
        // Amber highlight — fixed in both themes (support band, badges),
        // always paired with onhighlight text.
        highlight: "rgb(var(--c-highlight) / <alpha-value>)",
        onhighlight: "rgb(var(--c-onhighlight) / <alpha-value>)",
        // Fixed dark surfaces — dark in BOTH themes by design (their inner
        // text uses white tones): the console widget and the MERN card.
        terminal: "rgb(var(--c-terminal) / <alpha-value>)",
        night: "rgb(var(--c-night) / <alpha-value>)",
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
