/* eslint-disable no-undef */
// require('jest-fetch-mock').enableMocks();

// jest.mock('react-native-bootsplash', () => {
//   return {
//     hide: jest.fn().mockResolvedValueOnce(),
//     getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
//   };
// });

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// require('react-native-reanimated/lib/module/reanimated2/jestUtils').setUpTests();
// jest.mock('react-native-reanimated', () =>
//   require('react-native-reanimated/mock'),
// );

// import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
// jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native', () => {
  return {
    StyleSheet: {
      create: () => ({}),
    },
  };
});
