import { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

const TransactionSkeleton = () => {
    const animatedValue = new Animated.Value(0.5);

    useEffect(() => {
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
            <Animated.View style={[styles.skeletonRectangle, skeletonStyle]} />
            <Animated.View style={[styles.skeletonRectangle, skeletonStyle]} />
            <Animated.View style={[styles.skeletonRectangle, skeletonStyle]} />
        </View>
    );
};


const styles = StyleSheet.create({
    skeletonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    skeletonRectangle: {
        height: 20,
        width: '30%',
        backgroundColor: '#e1e1e1',
        borderRadius: 4,
    },
});

export default TransactionSkeleton;
