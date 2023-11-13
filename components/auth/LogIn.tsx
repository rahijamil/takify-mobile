import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../config/supabaseConfig';
import { Colors } from '../../theme/theme';
import { AuthStatusType } from '../modals/AuthModal';

type AuthStackParamList = {
    '(auth)/forgotpassword': undefined;
    '(auth)/signup': undefined;
    '(tabs)': undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const Login = ({ setAuthStatus }: { setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatusType>> }) => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setError('');

        if (!isValidEmail()) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
        setIsLoading(true);

        try {
            const { data: { session }, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;

            // Navigate to the authenticated part of the app
            navigation.navigate('(tabs)');

        } catch (error: any) {
            if (error.message == "Email not confirmed") {
                setError("Please confirm your email address before logging in.");
            } else {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToSignUp = () => setAuthStatus("signup");
    const navigateToForgotPassword = () => setAuthStatus("forgot-password");

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                    placeholderTextColor={Colors.textSecondary}
                    autoFocus
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor={Colors.textSecondary}
                />
            </View>
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
                <TouchableOpacity
                    style={[styles.button, error ? styles.buttonError : null]}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={navigateToForgotPassword} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.signUpPrompt}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={navigateToSignUp}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        marginBottom: 24,
    },
    input: {
        height: 50,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        marginBottom: 16,
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
    buttonError: {
        backgroundColor: Colors.negative,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: '600',
    },
    forgotPassword: {
        alignSelf: 'center',
        paddingVertical: 10,
    },
    forgotPasswordText: {
        fontSize: 15,
        color: Colors.secondary,
        textAlign: 'center',
    },
    signUpPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        fontSize: 15,
        color: Colors.textSecondary,
    },
    signUpButtonText: {
        fontSize: 15,
        color: Colors.primary,
        fontWeight: '600',
    },
});

export default Login;