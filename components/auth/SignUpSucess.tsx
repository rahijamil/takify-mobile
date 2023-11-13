import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AuthStatusType } from '../modals/AuthModal';
import { Colors, Typography } from '../../theme/theme';

const SignUpSuccess = ({ setAuthStatus }: { setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatusType>> }) => {
    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <AntDesign name="checkcircleo" size={48} color={Colors.positive} style={styles.icon} />
            <Text style={styles.title}>Registration Successful!</Text>
            <Text style={styles.description}>
                A verification email has been sent. Please check your inbox and verify your email to log in.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setAuthStatus("login")}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Go to Login</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.lightBackground,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.text,
        fontFamily: Typography.primary,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.textSecondary,
        fontFamily: Typography.primary,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        elevation: 3,
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: Typography.secondary,
    },
});

export default SignUpSuccess;
