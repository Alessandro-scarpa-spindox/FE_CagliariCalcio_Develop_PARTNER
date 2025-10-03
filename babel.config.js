module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@realmProvider': './realm',
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.native.js',
            '.web.js',
            '.native.ts',
            '.web.ts',
            '.native.tsx',
            '.web.tsx',
          ],
        },
      ],
    ],
  }
}
