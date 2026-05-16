import nextConfig from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import storybookPlugin from 'eslint-plugin-storybook';

const eslintConfig = [
  {
    ignores: ['src/components/ui/**']
  },
  ...nextConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'warn',
      'jsx-quotes': ['warn', 'prefer-double'],
      semi: [2, 'always'],
      'space-before-function-paren': ['off'],
      camelcase: [
        'error',
        {
          allow: ['api_url', 'Geist_Mono']
        }
      ],
      'no-unused-vars': 'off',
      'comma-dangle': [
        'error',
        {
          functions: 'never'
        }
      ]
    }
  },
  ...storybookPlugin.configs['flat/recommended']
];

export default eslintConfig;
