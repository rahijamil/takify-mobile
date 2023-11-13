import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AuthModal, { AuthStatusType } from '../components/modals/AuthModal';
import { Colors, Typography } from '../theme/theme';
import { useAuth } from '../contexts/AuthContext';

export default function WelcomeScreen() {
    const { authLoading } = useAuth();
    const [authStatus, setAuthStatus] = useState<AuthStatusType>(null);

    return (
        <View style={styles.container}>
            {
                authLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={"large"} color={Colors.primary} />
                    </View>
                ) : (
                    <>
                        <LinearGradient
                            colors={[Colors.primary, 'rgba(0,82,204, 0.7)', 'rgba(0,162,255, 0.7)']}
                            style={styles.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <SafeAreaView style={styles.safeArea}>
                                <View style={styles.topSection}>
                                    <Image
                                        source={require('../assets/images/takify.png')}
                                        style={styles.topImage}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={styles.middleSection}>
                                    <Text style={styles.title}>Welcome to Takify</Text>
                                    <Text style={styles.description}>
                                        Your personal finance assistant. Track your expenses, manage your budget,
                                        and achieve your financial goals.
                                    </Text>
                                </View>

                                <View style={styles.bottomSection}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.joinButton]}
                                        onPress={() => setAuthStatus("signup")}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.buttonText}>Join Now</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.loginButton]}
                                        onPress={() => setAuthStatus("login")}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.buttonText}>Log In</Text>
                                    </TouchableOpacity>
                                </View>
                            </SafeAreaView>
                        </LinearGradient>

                        {authStatus && (
                            <AuthModal
                                authStatus={authStatus}
                                setAuthStatus={setAuthStatus}
                                onClose={() => setAuthStatus(null)}
                            />
                        )}

                    </>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    topSection: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%', // Ensure the container takes the full width
    },
    topImage: {
        width: '80%',
        height: '50%',
    },

    middleSection: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: Typography.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.white,
        fontFamily: Typography.primary,
        marginBottom: 20,
        paddingHorizontal: 30,
        opacity: 0.9,
    },
    bottomSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        width: '75%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 15,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: Colors.text,
        shadowOffset: { height: 3, width: 0 },
        elevation: 5,
    },
    joinButton: {
        backgroundColor: Colors.positive,
    },
    loginButton: {
        backgroundColor: 'rgba(255,255,255,0.3)', // Semi-transparent over the gradient
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: Typography.primary,
    },
    loginText: {
        marginTop: 10,
        color: Colors.accent,
        fontSize: 16,
        fontFamily: Typography.primary,
    },
});

