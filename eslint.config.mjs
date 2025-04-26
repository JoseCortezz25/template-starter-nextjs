import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "warn",
      "jsx-quotes": ["warn", "prefer-double"],
      "semi": [2, "always"],
      "space-before-function-paren": ["off"],
      "camelcase": [
        "error",
        {
          "allow": [
            "api_url",
            "some_other_identifier"
          ]
        }
      ],
      "no-unused-vars": "off",
      "comma-dangle": [
        "error",
        {
          "functions": "never"
        }
      ]
    }
  }
];

export default eslintConfig;
