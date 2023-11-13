import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { supabase } from '../../config/supabaseConfig';
import { Colors } from '../../theme/theme';
import { UserProfile } from '../../contexts/AuthContext';

type AuthStackParamList = {
    '(auth)/login': undefined;
    'successful-signup': undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const SignUp = ({ setAuthStatus }: { setAuthStatus: React.Dispatch<React.SetStateAction<"login" | "signup" | "forgot-password" | "signup-success" | null>> }) => {
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email: string) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password: string) => {
        return password.length >= 6; // Example criteria, can be more complex
    };

    const handleSignUp = async () => {
        setError('');

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setIsLoading(true);

            supabase.auth.signUp({ email, password }).then(async (response) => {
                if (response.error) {
                    setError(response.error.message);
                }

                if (response.data) {
                    const authUser = response.data.user;

                    if (authUser?.email) {
                        const user: UserProfile = {
                            auth_uid: authUser.id,
                            email: authUser.email,
                            display_name: "",
                            photo_url: "",
                            created_at: authUser?.created_at,
                        };

                        const { data, error } = await supabase.from("profiles").insert([user]);

                        if (error) {
                            setError(error.message);
                            return;
                        }

                        setAuthStatus("signup-success");
                    }
                }
            })

        } catch (error: any) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    const navigateToLogin = () => setAuthStatus("login");

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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
            <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor={Colors.textSecondary}
            />

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
                <TouchableOpacity
                    style={[styles.button, error ? styles.buttonError : null]}
                    onPress={handleSignUp}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            )}

            <View style={styles.loginPrompt}>
                <Text style={styles.loginPromptText}>Already have an account? </Text>
                <TouchableOpacity onPress={navigateToLogin} activeOpacity={0.7}>
                    <Text style={styles.loginText}>Log In</Text>
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

    loginPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    loginPromptText: {
        fontSize: 15,
        color: '#8E8E93',
    },
    loginText: {
        fontSize: 15,
        color: Colors.primary,
        fontWeight: '600',
    },
});

export default SignUp;
