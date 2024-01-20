/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
