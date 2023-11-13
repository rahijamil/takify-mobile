import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import AddEditTransactionModal from '../../components/modals/AddEditTransactionModal';
import { useState, useEffect } from 'react';
import NotificationsModal from '../../components/modals/NotificationsModal';
import { Colors as BrandColors } from '../../theme/theme';
import AddBudgetModal from '../../components/modals/AddBudgetModal';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isVisibleAddTransactionModal, setIsVisibleAddTransactionModal] = useState<boolean>(false);
  const [isVisibleAddBudgetModal, setIsVisibleAddBudgetModal] = useState<boolean>(false);
  const [isVisibleNotification, setIsVisibleNotificaion] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Hide FAB
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Show FAB
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Function to handle FAB press
  const onFabPress = () => {
    setIsVisibleAddTransactionModal(true);
  };

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: BrandColors.primary,
          headerShadowVisible: false,
          headerTitleStyle: {
            color: BrandColors.primary,
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          tabBarStyle: {
            backgroundColor: "#ecf0f1",
          },
          tabBarLabelStyle: {
            color: BrandColors.text,
          },
          tabBarHideOnKeyboard: true,
          // headerTitle: () => (
          //   <Text style={styles.title}>Takify</Text>
          // ),
          // headerRight: () => (
          //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          //     <Pressable onPress={() => setIsVisibleNotificaion(true)}>
          //       {({ pressed }) => (
          //         <MaterialCommunityIcons
          //           name="bell"
          //           size={25}
          //           color="#222"
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </View>
          // ),
          // tabBarShowLabel: false
        }}
      >
        <Tabs.Screen
          name="one"
          options={{
            title: 'Home',
            headerTitle: "Takify",
            tabBarIcon: ({ color, focused }) => <TabBarIcon name="home" color={focused ? BrandColors.primary : BrandColors.text} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Transactions',
            tabBarIcon: ({ color, focused }) => <TabBarIcon name="swap-horizontal" color={focused ? BrandColors.primary : BrandColors.text} />,
          }}
        />
        <Tabs.Screen
          name="placeholder"
          options={{
            title: 'placeholder',
            tabBarLabelStyle: { display: 'none' },
            tabBarIconStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            title: 'Budget',
            headerRight: () => (
              <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisibleAddBudgetModal(true)}>
                <MaterialCommunityIcons
                  name="plus"
                  size={25}
                  color="#222"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, focused }) => <TabBarIcon name="chart-pie" color={focused ? BrandColors.primary : BrandColors.text} />,
          }}
        />
        <Tabs.Screen
          name="four"
          options={{
            title: 'Me',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabBarIcon name="account" color={focused ? BrandColors.primary : BrandColors.text} />,
          }}
        />
      </Tabs>

      {!isKeyboardVisible && (
        <TouchableOpacity
          style={styles.fab}
          onPress={onFabPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <View style={styles.fabOverlay}></View>

      {
        isVisibleAddTransactionModal &&
        <AddEditTransactionModal
          isVisible={isVisibleAddTransactionModal}
          onClose={() => setIsVisibleAddTransactionModal(false)}
        />
      }

      {
        isVisibleAddBudgetModal &&
        <AddBudgetModal
          isVisible={isVisibleAddBudgetModal}
          onClose={() => setIsVisibleAddBudgetModal(false)}
        />
      }

      {
        isVisibleNotification &&
        <NotificationsModal
          isVisible={isVisibleNotification}
          onClose={() => setIsVisibleNotificaion(false)}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBarStyle: {
    backgroundColor: "#ecf0f1"
  },
  fabOverlay: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -28 }],
    width: 56,
    height: 50,
    backgroundColor: "ecf0f1",
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -28 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    zIndex: 1
  },
})