// globalStyles.ts
import { StyleSheet } from 'react-native';
import { Colors, Typography } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    // ... more styles
  },
  text: {
    color: Colors.text,
    fontFamily: Typography.primary,
    // ... more styles
  },
  // ... more global styles
});
