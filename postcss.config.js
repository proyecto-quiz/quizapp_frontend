/** @type{import("postcss").Postcss} */
const postCssConfig = {
  plugins: { 'postcss-import': {}, tailwindcss: {}, autoprefixer: {} },
};

module.exports = postCssConfig;
