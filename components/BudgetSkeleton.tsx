import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const BudgetSkeleton = () => {
    const animatedValue = new Animated.Value(0.5);

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0.5,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const skeletonStyle = {
        opacity: animatedValue,
    };

    return (
        <View style={styles.skeletonContainer}>
            <View style={styles.skeletonHeader}></View>
            <Animated.View style={[styles.skeletonBar, skeletonStyle]} />
            <Animated.View style={[styles.skeletonBar, skeletonStyle]} />
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        borderRadius: 8,
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    skeletonHeader: {
        height: 20,
        marginBottom: 10,
        backgroundColor: '#e1e1e1',
        borderRadius: 4,
    },
    skeletonBar: {
        height: 10,
        backgroundColor: '#e1e1e1',
        borderRadius: 4,
        marginBottom: 5,
    },
});

export default BudgetSkeleton;
