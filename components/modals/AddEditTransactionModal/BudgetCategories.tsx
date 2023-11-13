import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { EXPENSE_CATEGORY_GROUPS, INCOME_CATEGORY_GROUPS, DEBT_CATEGORY_GROUPS } from './categories';

type BudgetCategory = {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
};

const BudgetCategoryCard: React.FC<{
  budgetCategory: BudgetCategory;
  onBudgetChange: (id: string, budgeted: number) => void;
  onSpentChange: (id: string, spent: number) => void;
}> = ({ budgetCategory, onBudgetChange, onSpentChange }) => {
  return (
    <View style={styles.budgetCategoryCard}>
      <Text style={styles.budgetCategoryName}>{budgetCategory.name}</Text>
      <View style={styles.budgetCategoryInputs}>
        <TextInput
          style={[styles.budgetInput, styles.input]}
          value={budgetCategory.budgeted.toString()}
          onChangeText={(text) => onBudgetChange(budgetCategory.id, parseFloat(text) || 0)}
          keyboardType="numeric"
          placeholder="Budgeted"
        />
        <TextInput
          style={[styles.spentInput, styles.input]}
          value={budgetCategory.spent.toString()}
          onChangeText={(text) => onSpentChange(budgetCategory.id, parseFloat(text) || 0)}
          keyboardType="numeric"
          placeholder="Spent"
        />
      </View>
    </View>
  );
};

// Define the BudgetCategories component
const BudgetCategories: React.FC = () => {
  // State to hold the budget categories
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);

  // Handlers to update the budget and spent values
  const handleBudgetChange = (id: string, budgeted: number) => {
    setBudgetCategories((prev) => prev.map((cat) => cat.id === id ? { ...cat, budgeted } : cat));
  };

  const handleSpentChange = (id: string, spent: number) => {
    setBudgetCategories((prev) => prev.map((cat) => cat.id === id ? { ...cat, spent } : cat));
  };

  // Initialize budget categories based on expense and income categories
  // This would likely be done once on component mount or when categories are fetched/updated
  const initBudgetCategories = () => {
    const combinedCategories = [...EXPENSE_CATEGORY_GROUPS, ...INCOME_CATEGORY_GROUPS].map((cat, index) => ({
      ...cat,
      id: index.toString(),
      budgeted: 0,
      spent: 0,
    }));
    setBudgetCategories(combinedCategories);
  };

  // Call the initialization function
  // This should be called in an effect or similar to avoid being called on every render
  useEffect(() => { initBudgetCategories(); }, []);

  return (
    <FlatList
      data={budgetCategories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BudgetCategoryCard
          budgetCategory={item}
          onBudgetChange={handleBudgetChange}
          onSpentChange={handleSpentChange}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  budgetContainer: {

  },
  budgetCategoryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  budgetCategoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  budgetCategoryInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    // Add other styling properties as needed
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryTitle: {
    fontWeight: 'bold',
  },
  budgetInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 8,
    width: 100,
    marginRight: 5,
  },
  spentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 8,
    width: 100,
  },
});

export default BudgetCategories;