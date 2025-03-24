<<<<<<< HEAD
/** @type {import("eslint").Linter.Config} */
=======
>>>>>>> fffa302 (re-intilizing the repo)
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
<<<<<<< HEAD
};
=======
  overrides: [
    {
      files: ['tailwind.config.js'],
      parser: 'espree', 
      parserOptions: {
        ecmaVersion: 'latest'
      }
    }
  ]
}
>>>>>>> fffa302 (re-intilizing the repo)
