/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
const fs = require("fs");
const escape = require("escape-string-regexp");
const { getDefaultConfig } = require("@expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

const root = path.resolve(__dirname, "../..");
const shared = path.resolve(root, "shared");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs", "mjs");

// List all shared under `shared/`
const workspaces = fs
  .readdirSync(shared)
  .map((p) => path.join(shared, p))
  .filter(
    (p) =>
      fs.statSync(p).isDirectory() &&
      fs.existsSync(path.join(p, "package.json"))
  );


module.exports = {
  ...defaultConfig,
  projectRoot: __dirname,
  // We need to watch the root of the monorepo
  // This lets Metro find the monorepo shared automatically using haste
  // This also lets us import modules from monorepo root
  watchFolders: [root],
  resolver: {
    ...defaultConfig.resolver,
  },

  server: {
    ...defaultConfig.server,
    enhanceMiddleware: (middleware) => {
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
};
