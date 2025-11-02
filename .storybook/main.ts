import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        postCss: {
          implementation: require.resolve('postcss')
        },
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    plugins: [
                      require.resolve('@tailwindcss/postcss'),
                      require.resolve('autoprefixer')
                    ]
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  staticDirs: ['../public'],
  async webpackFinal(config) {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    return config;
  }
};
export default config;
