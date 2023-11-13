import * as React from 'react';
import * as AuthSession from 'expo-auth-session';
import QueryParams from 'expo-auth-session/build/QueryParams'
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import { supabase } from '../../config/supabaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = AuthSession.makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
    try {
        // Create a URL object from the full URL
        const parsedUrl = new URL(url);

        console.log({ parsedUrl })

        // Get the fragment (hash) part of the URL
        const hash = parsedUrl.hash;

        // Create a URLSearchParams object from the hash
        const params = new URLSearchParams(hash.substring(1)); // Remove the '#' before parsing

        // Now you can get the access_token and refresh_token from params
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        const errorCode = params.get('error');

        // Check for errors or missing tokens and handle accordingly
        if (errorCode) {
            throw new Error(`OAuth Error: ${errorCode}`);
        }
        if (!access_token) {
            throw new Error('OAuth Error: No access token returned');
        }

        if (!refresh_token) {
            throw new Error('OAuth Error: No refresh token returned');
        }

        // const { params, errorCode } = QueryParams.getQueryParams(url);

        if (errorCode) throw new Error(errorCode);
        // const { access_token, refresh_token } = params;

        if (!access_token) return;

        const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
        });
        if (error) throw error;
        return data.session;
    } catch (error) {
        console.log({ error });
    }
};

const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo,
            skipBrowserRedirect: true,
        },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? "",
        redirectTo
    );

    if (res.type === "success") {
        const { url } = res;
        // if (url) await createSessionFromUrl(url);
    }
};

export default function SignInWithGoogleButton() {
    const url = Linking.useURL();
    React.useEffect(() => {
        if (url) {
            // createSessionFromUrl(url).catch(error => console.error(error));
        }
    }, [url]);

    return (
        <Button
            // disabled={!request}
            title="Login with Google"
            onPress={() => {
                // promptAsync();
                performOAuth();
            }}
        />
    );
}
