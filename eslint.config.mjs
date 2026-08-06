import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships native flat configs, so they are spread directly.
 * Wrapping them in FlatCompat (the v15 pattern) throws on a circular reference.
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".cache/**",
      "node_modules/**",
      "next-env.d.ts",
      // CommonJS by requirement — puppeteer reads this before any ESM loader.
      ".puppeteerrc.cjs",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
