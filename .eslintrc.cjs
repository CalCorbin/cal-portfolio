/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ["react", "import", "@typescript-eslint"],
  rules: {
    "react/jsx-filename-extension": 0,
    "no-underscore-dangle": 0,
    "func-names": 0,
    "no-use-before-define": 0,
    "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    "react/react-in-jsx-scope": 0,
  },
  root: true,
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
    react: {
      version: "detect",
    }
  },
};