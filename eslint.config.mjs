import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: true, // Enable project service for TypeScript
                tsconfigRootDir: ".", // Set the root directory for tsconfig
            },
        },
    },
    {
        rules: {
            "@typescript-eslint/no-floating-promises": "error", // Enforce handling of promises
            "@typescript-eslint/await-thenable": "error", // Enforce using await with thenables
        }
    }
);