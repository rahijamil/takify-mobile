import React, { useState } from 'react';
import {
    View,
    TextInput,
    Switch,
    StyleSheet,
} from "react-native";
import { Picker } from '@react-native-picker/picker';

type DatePickerProps = {
    date: Date;
    onDateChange: (date: string) => void;
};

type TextInputFieldProps = {
    label: string;
    value: any;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

type RecurringToggleProps = {
    isEnabled: boolean;
    onToggle: () => void;
};

type PaymentMethodSelectorProps = {
    onMethodSelect: (method: string) => void;
};

type BudgetInputSectionProps = {
    onBudgetChange: (name: string, value: number) => void;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({ label, value, onChangeText, keyboardType }) => {
    return (
        <View style={styles.inputFieldContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={label}
            />
        </View>
    );
};

export const RecurringToggle: React.FC<RecurringToggleProps> = ({ isEnabled, onToggle }) => {
    return (
        <View>
            <Switch
                value={isEnabled}
                onValueChange={onToggle}
            />
        </View>
    );
};

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ onMethodSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState<string>('');

    return (
        <Picker
            selectedValue={selectedMethod}
            onValueChange={(itemValue) => {
                setSelectedMethod(itemValue);
                onMethodSelect(itemValue);
            }}
        >
            {/* Assuming you have a list of methods, map over them here */}
            <Picker.Item label="Credit Card" value="creditCard" />
            <Picker.Item label="Debit Card" value="debitCard" />
            <Picker.Item label="PayPal" value="paypal" />
            {/* ...other methods */}
        </Picker>
    );
};

const styles = StyleSheet.create({
    detailsForm: {
        backgroundColor: '#fff', // white background for the form
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    inputFieldContainer: {
        flex: 1,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd', // light grey for input border
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        backgroundColor: "white"
    },
    categoryView: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap",
    },

});
