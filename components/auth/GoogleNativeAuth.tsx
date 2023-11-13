import React, { useEffect, useState } from 'react'
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleNativeAuth() {
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_OAUTH_ANDROID_CLIENT_ID,
            redirectUri: AuthSession.makeRedirectUri(),
        }
    );

    useEffect(() => {
        handleSignInWithGoogle();
    }, [response]);

    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");

        if (!user) {
            if (response?.type == "success") {
                await getUserInfo(response.authentication?.accessToken);
            }
        }
        else {
            setUserInfo(JSON.parse(user))
        }
    }

    const getUserInfo = async (token?: string) => {
        if (!token) return;

        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));

            setUserInfo(user);
        } catch (error) {

        }
    }

    return (
        <View>
            <Text>{JSON.stringify(userInfo)}</Text>
            <Button title='Continue with Google' onPress={() => promptAsync()} />
        </View>
    )
}
