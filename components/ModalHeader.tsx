import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/theme';

const ModalHeader = ({ onClose, title, iconRight, isLightBackground }: {
    onClose: () => void, title: string, iconRight?: {
        iconName: keyof typeof MaterialCommunityIcons.glyphMap,
        onPress: () => void,
    },
    isLightBackground?: boolean
}) => {
    return (
        <View style={{ ...styles.modalHeader, backgroundColor: isLightBackground ? Colors.lightBackground : Colors.white }}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
                <MaterialCommunityIcons name='arrow-left' size={24} color={'#333333'} />
            </TouchableOpacity>

            <Text style={{ ...styles.modalTitle, paddingRight: iconRight ? 0 : 32 }}>{title}</Text>

            {
                iconRight && (
                    <TouchableOpacity onPress={iconRight.onPress} style={styles.closeButton} activeOpacity={0.7}>
                        <MaterialCommunityIcons name={iconRight.iconName} size={24} color={'#333333'} />
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        flex: 1,
        textAlign: "center",
    },
    closeButton: {
        padding: 8,
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 8
    },
});

export default ModalHeader;