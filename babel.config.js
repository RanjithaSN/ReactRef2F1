module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    'istanbul',
    '@babel/plugin-transform-modules-commonjs',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
        corejs: 3,
      },
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ],
};
