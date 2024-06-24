module.exports = {
  '*.{ts,tsx,js,jsx}': 'eslint --fix',
  '*.{ts,tsx}': "bash -c 'npm run check-types'",
  '*.{json,html,scss,js,jsx,ts,tsx}': 'npm run format',
}
