import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SettingsModal from '../../components/modals/SettingsModal';
import { useAuth } from '../../contexts/AuthContext';

type SettingOptionProps = {
  title: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
  isSwitch?: boolean;
  isEnabled?: boolean;
  onToggle?: () => void;
}

const SettingOption = ({ title, iconName, onPress, isSwitch, isEnabled, onToggle }: SettingOptionProps) => (
  <TouchableOpacity onPress={onPress} style={styles.option} activeOpacity={0.7}>
    <MaterialCommunityIcons name={iconName} size={24} style={styles.icon} />
    <Text style={styles.optionText}>{title}</Text>
    {isSwitch && (
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={onToggle}
        value={isEnabled}
      />
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const [isShowSettingsModal, setIsShowSettingsModal] = useState(false);
  const { user } = useAuth();

  // Replace Alert with actual navigation or state management logic
  const handleLanguageSettings = () => Alert.alert('Language Settings', 'Language settings to be implemented.');
  const handleSettings = () => {
    setIsShowSettingsModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.avatarWrapper}
        activeOpacity={0.7}
        onPress={() => Alert.alert("Profile", "Profile to be implemented.")}>
        {
          user
            ? user.photo_url ? <Image
              source={{ uri: user.photo_url }}
              width={60}
              height={60} /> : <View style={styles.avatar}>
              <Text style={{ fontWeight: "bold", fontSize: 40 }}>{user.email?.slice(0, 1)}</Text>
            </View>
            : (<View style={styles.avatar}>
              <MaterialCommunityIcons name='account' size={40} />
            </View>)
        }

        <View>
          <Text style={styles.avatarTitle}>{
            user ?
              (
                user.display_name ? user.display_name : user.email?.split("@")[0]
              )
              : "Sign In"
          }</Text>
          <Text style={styles.avatarSubTitle}>{user ? user.email : "Sign in, more exciting!"}</Text>
        </View>
      </TouchableOpacity>

      <SettingOption
        title="Recommend to friends"
        iconName="thumb-up"
        onPress={() => Alert.alert("Recommend to friends", "Recommend to friends to be implemented.")}
      />
      <SettingOption
        title="Rate the app"
        iconName="star"
        onPress={() => Alert.alert("Rate the app", "Rate the app to be implemented.") }
      />
      <SettingOption
        title="Settings"
        iconName="cog"
        // onPress={handleSettings}
        onPress={() => Alert.alert("Settings", "Settings to be implemented.")}
      />

      {isShowSettingsModal && (
        <SettingsModal
          isVisible={isShowSettingsModal}
          onClose={() => setIsShowSettingsModal(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    backgroundColor: "#ccc",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  avatarSubTitle: {
    fontSize: 14,
    color: "#666",
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 24,
    color: '#333', // Choose a color that matches your app theme
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    color: '#333', // Choose a color that matches your app theme
  },
});

export default SettingsScreen;
