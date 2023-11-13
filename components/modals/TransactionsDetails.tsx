import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Transaction } from './AddEditTransactionModal/transactionsTypes';

export default function TransactionDetails({ transaction, onClose }: { transaction: Transaction, onClose: () => void }) {
    if (!transaction) {
        return (
            <View style={styles.centeredView}>
                <Text style={styles.notFound}>Transaction not found</Text>
            </View>
        );
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!transaction.id}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <MaterialCommunityIcons name="close" size={24} color="#666" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Transaction Details</Text>
                    <View style={styles.modalContent}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Category:</Text>
                            <Text style={styles.infoValue}>{transaction.category?.name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Type:</Text>
                            <Text style={styles.infoValue}>{transaction.type}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Amount:</Text>
                            <Text style={styles.infoValue}>${transaction.amount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Date:</Text>
                            <Text style={styles.infoValue}>{transaction.date}</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit Transaction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContent: {
        width: '100%',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '400',
        color: '#2c3e50',
    },
    editButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: '#3498db',
        marginTop: 10,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    detailsContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    notFound: {
        fontSize: 18,
        textAlign: 'center',
        margin: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
