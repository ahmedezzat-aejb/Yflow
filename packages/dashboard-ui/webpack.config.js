const { composePlugins, withNx, withWeb } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// ده بيخلي الـ Webpack يعرف مكانه الصح جوه الـ Monorepo
module.exports = composePlugins(withNx(), withWeb(), withReact(), (config) => {
  return config;
});
