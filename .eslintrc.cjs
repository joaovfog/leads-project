module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["@rocketseat/eslint-config/react", "next/core-web-vitals"],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-unknown-property": "off"
  }
}
