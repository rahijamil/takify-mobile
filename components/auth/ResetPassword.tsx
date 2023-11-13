import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { supabase } from '../../config/supabaseConfig';
import { AuthStatusType } from '../modals/AuthModal';
import { Colors, Typography } from '../../theme/theme';

type AuthStackParamList = {
    '(auth)/login': undefined
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const ResetPassword = ({ setAuthStatus }: { setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatusType>> }) => {
    const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const handlePasswordReset = () => {
        setError('');
        setMessage('');

        if (!isValidEmail()) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        
        supabase.auth.resetPasswordForEmail(email)
            .then(() => {
                // Password reset email sent! Inform the user.
                setMessage('A link to reset your password has been sent to your email address.');
                // Optionally navigate back to the login screen or give other instructions.
            })
            .catch((error) => {
                setError(error.message);
            }).finally(() => {
                setIsLoading(false);
            })
    };

    const navigateToLogin = () => setAuthStatus("login")

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor={Colors.textSecondary}
                autoFocus
            />
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
            {message ? <Text style={styles.successMessage}>{message}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePasswordReset}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Send Password Reset Email</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={navigateToLogin} style={styles.loginPrompt}>
                <Text style={styles.promptText}>Remembered your password? </Text>
                <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: Colors.lightBackground,
    },
    input: {
        height: 50,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: Colors.white,
        fontSize: 16,
        color: Colors.text,
    },
    errorMessage: {
        color: Colors.negative,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    successMessage: {
        color: Colors.positive,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: Colors.text,
        shadowOffset: { height: 2, width: 0 },
        elevation: 3,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: '600',
        fontFamily: Typography.secondary,
    },
    loginPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    promptText: {
        fontSize: 15,
        color: Colors.textSecondary,
        fontFamily: Typography.primary,
    },
    loginText: {
        fontSize: 15,
        color: Colors.primary,
        fontWeight: '600',
        fontFamily: Typography.secondary,
    },
});

export default ResetPassword;
