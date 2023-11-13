
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

type AttachmentUploaderProps = {
    onFileAttached: (result: DocumentPicker.DocumentPickerResult) => void;
};
const AttachmentUploader: React.FC<AttachmentUploaderProps> = ({ onFileAttached }) => {
    const [attachmentUri, setAttachmentUri] = useState<string | null>(null);

    const handlePress = async () => {
        try {
            const result: any = await DocumentPicker.getDocumentAsync();
            if (!result.cancelled) {
                // setAttachmentUri(result.uri);
                onFileAttached(result); // Assuming onFileAttached can handle this type
            }
        } catch (error) {
            console.error("An error occurred while picking the document:", error);
        }
    };

    return (
        <View style={styles.attachmentUploader}>
            <TouchableOpacity onPress={handlePress}>
                <MaterialCommunityIcons name='image' size={24} color='#333' />
            </TouchableOpacity>

            {attachmentUri && (
                <Text style={styles.attachmentText}>File attached</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    attachmentUploader: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: "white"
    },
    attachmentText: {
        fontSize: 14,
        color: '#333',
    },

})

export default AttachmentUploader;