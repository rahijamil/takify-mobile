import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import NotificationIcon from '../icons/NotificationIcon';

export default function NotificationsModal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);

    useEffect(() => {
        // Listener for notifications received while the app is foregrounded
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        return () => subscription.remove();
    }, []);

    // Function to schedule a notification
    const scheduleNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Attention! 📢",
                body: "You are close to reaching your budget limit.",
            },
            trigger: null, // immediate notification
        });
    };

    // Call this function to test notification when modal is visible
    useEffect(() => {
        if (isVisible) {
            scheduleNotification();
        }
    }, [isVisible]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <NotificationIcon />
                    <Text style={styles.modalTitle}>New Notification</Text>
                    <Text style={styles.notificationMessage}>
                        {notification?.request.content.body || 'You are close to reaching your budget limit.'}
                    </Text>
                    <TouchableOpacity
                        style={styles.dismissButton}
                        onPress={onClose}
                    >
                        <Text style={styles.dismissButtonText}>Dismiss</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2E86C1',
    },
    notificationIcon: {
        width: 60,
        height: 60,
        marginBottom: 20,
    },
    notificationMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 15,
    },
    dismissButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    dismissButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

