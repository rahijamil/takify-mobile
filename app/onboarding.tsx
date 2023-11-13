import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

export default function OnboardingScreen() {
    const navigation = useNavigation();

    // Function to navigate to the Sign Up screen
    const handleSignUp = () => {
        // navigation.navigate('(auth)/signup'); // Replace with your actual sign-up route
    };

    // Function to navigate to the Log In screen
    const handleLogIn = () => {
        // navigation.navigate('(auth)/login'); // Replace with your actual log-in route
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Finance Tracker App</Text>
            <Text style={styles.description}>
                Track your expenses, manage your budget, and improve your financial health.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogIn}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: '#0066FF',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
