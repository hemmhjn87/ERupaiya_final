module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // ✅ Required for Reanimated animations
      'expo-router/babel', // ✅ Required for Expo Router
    ],
  };
  