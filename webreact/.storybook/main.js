const { mergeConfig } = require('vite');
const path = require('path');
const vitePluginImp = require('vite-plugin-imp');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },

  staticDirs: ['../public'],

  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Use the same "resolve" configuration as your app
      // resolve: (await import('../vite.config.js')).default.resolve,
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src')
        }
      },
      plugins: [
        vitePluginImp({
          libList: [
            {
              libName: 'antd-mobile',
              style: () => false,
              libDirectory: 'es/components',
              replaceOldImport: true
            }
          ]
        })
      ],
      // Add dependencies to pre-optimization
      // optimizeDeps: {
      //   // include: ['storybook-dark-mode'],
      // },
    });
  },
}