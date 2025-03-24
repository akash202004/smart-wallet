const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
<<<<<<< HEAD
=======
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
>>>>>>> fffa302 (re-intilizing the repo)
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
<<<<<<< HEAD
  extends: ["eslint:recommended", "prettier", "turbo"],
=======
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
>>>>>>> fffa302 (re-intilizing the repo)
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
};
