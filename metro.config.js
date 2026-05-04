const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Inline requires defer the cost of loading every JS module until it's first
// referenced. Combined with `lazy: true` on the bottom-tab navigator and
// `freezeOnBlur` on the stacks, this is the largest single cold-start win on
// Android — the JS bundle still bundles every screen, but the modules for
// screens you haven't visited never execute.
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
