/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Perhatikan: Kita pakai plugin khusus v4
    "@tailwindcss/postcss": {},
  },
};

export default config;