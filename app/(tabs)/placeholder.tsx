import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function PlaceholderForFAB() {
    const navigation = useNavigation<StackNavigationProp<{ '(tabs)': undefined }>>();

    navigation.navigate("(tabs)")

    return (
        <Text>PlaceholderForFAB</Text>
    )
}
