import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from '../../../theme/theme';
import ModalHeader from '../../ModalHeader';
import { TransactionState, TransactionType } from './transactionsTypes';
import { Category } from './categories';
import useTransactionForm from '../../../hooks/useTransactionForm';
import { TextInputField } from './utils.transactionmodal';
import { ActivityIndicator } from 'react-native';
import { supabase } from '../../../config/supabaseConfig';
import DatePickerComponent from './DatePickerComponent';
import AttachmentUploader from './utils/AttatchmentUploader';
import CategorySelector from './utils/CategorySelector';

const initialLayout = { width: Dimensions.get('window').width };

const initialState: TransactionState = {
    type: TransactionType.Expense,
    note: '',
    category: null,
    date: "",
    amount: 0,
};

export default function AddEditTransactionModal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    const {
        state: transaction,
        setType,
        setNote,
        setDate,
        setAmount,
        toggleCategory,
    } = useTransactionForm(initialState);

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [inputAmount, setInputAmount] = useState('');
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Expenses' },
        { key: 'second', title: 'Income' },
        { key: 'third', title: 'Debt' },
    ]);

    const onIndexChange = useCallback((newIndex: number) => {
        setIndex(newIndex);
        const newType = Object.values(TransactionType)[newIndex];
        setType(newType);
        setShowDetails(false); // Reset the showDetails state
        toggleCategory(null); // Reset the selected category
        setAmount(0);
        setNote('');
        setInputAmount('');
        setIsDisable(true);
    }, [setType, toggleCategory]);

    // Modify the handleSelectCategory to set the showDetails to true
    const handleSelectCategory = useCallback((category: Category) => {
        toggleCategory(category);
        setShowDetails(true); // Show additional input fields when a category is selected
    }, [toggleCategory]);

    const handleAmountChange = useCallback((amount: string) => {
        const numericValue = amount.replace(/[^0-9.]/g, '');
        setInputAmount(numericValue); // Update the TextInputField to reflect the sanitized input
        const num = parseFloat(numericValue);

        if (!isNaN(num) && num > 0) {
            setAmount(num);
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [setAmount, setIsDisable]);

    const handleNoteChange = (note: string) => {
        setNote(note);
    };

    const handleFileAttachment = () => {
        // TODO: Implement the logic for file attachment
        console.log('File attached');
    };

    const handleSubmit = async () => {
        // Construct the transaction object
        const transactionData = {
            type: transaction.type,
            note: transaction.note,
            category: transaction.category, // Ensure you have a category name or null
            date: transaction.date,
            amount: transaction.amount,
        };

        if (!transactionData.category || !transactionData.amount || !transactionData.date) {
            return;
        }

        try {

            setIsLoading(true);

            // Add a new document with a generated id to the "transactions" collection
            const { data, error } = await supabase.from("transactions").insert(transactionData).select("id").single();

            if (error) console.error(`Error adding budget: ${error.message}`);

            console.log("Transaction submitted with ID: ", data?.id);
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error adding transaction: ", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const renderDetailsForm = useMemo(() => (
        <View style={styles.detailsForm}>
            <View style={{ flexDirection: "row" }}>
                <TextInputField
                    label="Amount"
                    keyboardType="numeric"
                    value={inputAmount}
                    onChangeText={handleAmountChange}
                />
                <DatePickerComponent
                    date={transaction.date}
                    setDate={setDate}
                    datePickerStyle={{ marginBottom: 10, marginLeft: 10 }}
                />
            </View>
            <View style={{ flexDirection: "row" }}>
                <TextInputField
                    label="Note"
                    value={transaction.note}
                    onChangeText={handleNoteChange}
                />
                <AttachmentUploader onFileAttached={handleFileAttachment} />
            </View>
            {
                isLoading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                ) : (
                    <TouchableOpacity
                        style={[styles.saveButton, isDisable && styles.saveButtonDisabled]}
                        onPress={handleSubmit}
                        activeOpacity={0.7}
                        disabled={isDisable}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    ), [showDetails, transaction]);

    const renderExpenseTab = useMemo(() => (
        <CategorySelector
            key={TransactionType.Expense}
            onCategorySelect={handleSelectCategory}
            transaction={transaction}
            type={TransactionType.Expense}
        />

    ), [showDetails, transaction.category]);

    const renderIncomeTab = useMemo(() => (
        <CategorySelector
            key={TransactionType.Income}
            onCategorySelect={handleSelectCategory}
            transaction={transaction}
            type={TransactionType.Income}
        />
    ), [showDetails, transaction.category]);


    const renderDebtTab = useMemo(() => (
        <CategorySelector
            key={TransactionType.Debt}
            onCategorySelect={handleSelectCategory}
            transaction={transaction}
            type={TransactionType.Debt}
        />
    ), [showDetails, transaction.category]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
            activeColor={Colors.primary}
            inactiveColor={Colors.textSecondary}
        />
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title='Add Transaction' onClose={onClose} />

                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={({ route }) => {
                            switch (route.key) {
                                case 'first':
                                    return renderExpenseTab;
                                case 'second':
                                    return renderIncomeTab;
                                case 'third':
                                    return renderDebtTab;
                                default:
                                    break;
                            }
                        }}
                        onIndexChange={onIndexChange}
                        initialLayout={initialLayout}
                        renderTabBar={renderTabBar}
                    />

                    {showDetails && renderDetailsForm}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0,0,0,0.5)" // Semi-transparent background for modal overlay
    },
    modalContent: {
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
    },
    tabBar: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    indicator: {
        backgroundColor: Colors.primary,
    },
    detailsForm: {
        backgroundColor: '#ecf0f1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        minHeight: 220,
        padding: 16,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    saveButtonDisabled: {
        backgroundColor: '#aaa',
    }
})

