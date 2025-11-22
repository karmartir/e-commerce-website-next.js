module.exports = {
  // Only process CSS files
  customSyntax: 'postcss',
  // Ignore non-CSS files
  ignoreFiles: [
    '**/*.tsx',
    '**/*.ts',
    '**/*.js',
    '**/*.jsx',
    '**/*.json',
    '**/node_modules/**',
    '**/.next/**',
    '**/out/**',
    '**/build/**',
    '**/dist/**',
  ],
  rules: {
    // Add any stylelint rules you want here
  },
};




