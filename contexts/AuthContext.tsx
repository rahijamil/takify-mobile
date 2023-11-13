import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseConfig';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import { Session } from '@supabase/supabase-js';

export interface UserProfile {
    id?: string;
    email: string;
    display_name: string;
    photo_url: string;
    auth_uid: string;
    created_at: string;
}

interface AuthContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    signOut: () => Promise<void>;
    authLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    signOut: async () => { },
    authLoading: true
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

type NavigationProp = {
    '(tabs)': undefined;
    'index': undefined;
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const navigation = useNavigation<StackNavigationProp<NavigationProp>>();

    useEffect(() => {
        const updateUserData = async (session: Session | null) => {
            if (session?.user) {
                try {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('auth_uid', session.user.id) // or .eq('email', session.user.email)
                        .single();

                    if (profile) {
                        setUser(profile);
                    } else {
                        if (session.user.email) {
                            // If profile not found, create a default one
                            const defaultProfile: UserProfile = {
                                auth_uid: session.user.id,
                                email: session.user.email,
                                display_name: '',
                                photo_url: '',
                                created_at: new Date().toISOString(),
                            };

                            const { error: insertError } = await supabase
                                .from('profiles')
                                .insert([defaultProfile]);

                            if (!insertError) {
                                setUser(defaultProfile);
                            } else {
                                console.error('Error creating profile', insertError);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error fetching profile', error);
                }
            }
        };

        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.error(error);
            }
            updateUserData(session);
            setAuthLoading(false);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            updateUserData(session);
            setAuthLoading(false);
        });

        // Cleanup subscription on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (user?.email) {
            navigation.navigate("(tabs)");
        }
        else {
            navigation.navigate("index");
        }
    }, [user])

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, signOut, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
