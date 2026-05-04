module.exports = function (api) {
  api.cache(true);
  const isProd = process.env.NODE_ENV === 'production';
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: { '@': './src' },
          extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        },
      ],
      'react-native-worklets/plugin',
      ...(isProd ? ['transform-remove-console'] : []),
    ],
  };
};
