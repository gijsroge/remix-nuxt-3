module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  safelist: [
    {
      pattern: /(p|mb)-(2|6|10)/,
    },
  ],
};
