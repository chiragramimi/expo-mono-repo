// eslint-disable-next-line import/order
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs', 'mjs');

const path = require('path');

const root = path.resolve(__dirname, '../..');

module.exports = {
  ...defaultConfig,
  projectRoot: __dirname,

  resolver: {
    ...defaultConfig.resolver,
  },

  server: {
    ...defaultConfig.server,
    enhanceMiddleware: middleware => {
      return (req, res, next) => {
        // When an asset is imported outside the project root, it has wrong path on Android
        // So we fix the path to correct one
        if (/\/shared\/.+\.png\?.+$/.test(req.url)) {
          req.url = `/assets/../${req.url}`;
        }

        return middleware(req, res, next);
      };
    },
  },

  // We need to watch the root of the monorepo
  // This lets Metro find the monorepo shared automatically using haste
  // This also lets us import modules from monorepo root
  watchFolders: [root],
};
