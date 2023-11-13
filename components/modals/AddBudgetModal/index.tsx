import React, { useCallback } from 'react';
import { View, Modal, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import ModalHeader from '../../ModalHeader';
import CategorySelector from '../AddEditTransactionModal/utils/CategorySelector';
import { Category } from '../AddEditTransactionModal/categories';
import useBudgetForm from '../../../hooks/useBudgetForm';
import { BudgetState } from './budgetTypes';
import { TextInputField } from '../AddEditTransactionModal/utils.transactionmodal';
import DatePickerComponent from '../AddEditTransactionModal/DatePickerComponent';
import { TransactionType } from '../AddEditTransactionModal/transactionsTypes';
import { supabase } from '../../../config/supabaseConfig';

const initialState: BudgetState = {
    budget: 0,
    category: null,
    spent: 0,
    date: '',
    profile_id: '',
};

const RenderDetailsForm = ({ budget, onClose, setBudget, setDate }: {
    budget: BudgetState,
    onClose: () => void,
    setBudget: (amount: number) => void,
    setDate: (date: string) => void
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [budgetAmount, setBudgetAmount] = useState('');
    const [spentAmount, setSpentAmount] = useState('');
    const [isDisable, setIsDisable] = useState<boolean>(true);

    const handleSubmit = async () => {
        // Construct the transaction object
        const budgetData: BudgetState = {
            category: budget.category, // Ensure you have a category name or null
            date: budget.date,
            budget: budget.budget,
            spent: budget.spent,
            profile_id: budget.profile_id
        };

        if (!budgetData.category || !budgetData.budget || !budgetData.date) {
            return;
        }

        try {

            setLoading(true);

            // Add a new document with a generated id to the "transactions" collection
            const { data, error } = await supabase.from("budgets").insert(budgetData).select("id").single();

            if (error) console.error(`Error adding budget: ${error.message}`);


            console.log("Transaction submitted with ID: ", data?.id);
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error adding transaction: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleBudgetChange = useCallback((amount: string) => {
        const numericValue = amount.replace(/[^0-9.]/g, '');
        setBudgetAmount(numericValue); // Update the TextInputField to reflect the sanitized input
        const num = parseFloat(numericValue);

        if (!isNaN(num) && num > 0) {
            setBudget(num);
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [setBudget]);

    return (
        <View style={styles.detailsForm}>
            <TextInputField
                label="Budget"
                keyboardType="numeric"
                value={budget.budget}
                onChangeText={handleBudgetChange}
            />

            <DatePickerComponent date={budget.date} setDate={setDate} datePickerStyle={{
                flex: 1
            }} />

            {
                loading ? (
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
    )
}

export default function AddBudgetModal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    const {
        state: budget,
        setBudget,
        setDate,
        toggleCategory
    } = useBudgetForm(initialState);

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const handleSelectCategory = useCallback((category: Category) => {
        toggleCategory(category);
        setShowDetails(true); // Show additional input fields when a category is selected
    }, [toggleCategory]);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title='Add Budget' onClose={onClose} />

                    <CategorySelector
                        onCategorySelect={handleSelectCategory}
                        transaction={budget}
                        type={TransactionType.Expense}
                    />
                    {showDetails && (
                        <RenderDetailsForm
                            budget={budget}
                            onClose={onClose}
                            setBudget={setBudget}
                            setDate={setDate}
                        />
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
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
    },
})