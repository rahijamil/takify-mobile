import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import i18n from '../config/localization';
import { Colors } from '../theme/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <AuthProvider>
    <RootLayoutNav />
  </AuthProvider>;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
 
  // const loadPreferredLanguage = async () => {
  //   const storedLanguage = await AsyncStorage.getItem('preferredLanguage');
  //   if (storedLanguage) {
  //     i18n.locale = storedLanguage;
  //   }
  // };

  useEffect(() => {
    // loadPreferredLanguage();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        statusBarColor: "#ecf0f1",
        statusBarStyle: "dark",
        headerShadowVisible: false
      }}>
        <Stack.Screen name="index" options={{ headerShown: false, statusBarColor: Colors.primary, statusBarStyle: "light" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerTitle: "Welcome" }} />
      </Stack>
    </ThemeProvider>
  );
}
