import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, Alert, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalHeader from '../ModalHeader';

type SettingOptionProps = {
    title: string;
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    onPress: () => void;
    isSwitch?: boolean;
    isEnabled?: boolean;
    onToggle?: () => void;
};

const SettingOption = ({ title, iconName, onPress, isSwitch, isEnabled, onToggle }: SettingOptionProps) => (
    <TouchableOpacity onPress={onPress} style={styles.option}>
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

const SettingsModal = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

    const handleToggleSwitch = () => setIsNotificationsEnabled(previousState => !previousState);

    // Replace Alert with actual navigation or state management logic
    const handleAccountSettings = () => Alert.alert('Account Settings', 'Account settings to be implemented.');
    const handleLanguageSettings = () => Alert.alert('Language Settings', 'Language settings to be implemented.');
    const handlePrivacyPolicy = () => Alert.alert('Privacy Policy', 'Privacy policy details to be shown.');

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <ModalHeader title='Settings' onClose={onClose} />

                <SettingOption
                    title="Account"
                    iconName="account-circle-outline"
                    onPress={handleAccountSettings}
                />
                <SettingOption
                    title="Notifications"
                    iconName="bell-outline"
                    onPress={() => { }}
                    isSwitch
                    isEnabled={isNotificationsEnabled}
                    onToggle={handleToggleSwitch}
                />
                <SettingOption
                    title="Language"
                    iconName="web"
                    onPress={handleLanguageSettings}
                />
                <SettingOption
                    title="Privacy Policy"
                    iconName="shield-account"
                    onPress={handlePrivacyPolicy}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 16,
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

export default SettingsModal;
