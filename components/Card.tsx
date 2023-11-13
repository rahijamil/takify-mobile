import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, content, style, onPress }: { title: string, content: string; style: any, onPress?: () => void }) => {
    return (
        <View style={[styles.card, style]}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardContent}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 16,
        marginVertical: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardContent: {
        fontSize: 14,
    },
});

export default Card;
