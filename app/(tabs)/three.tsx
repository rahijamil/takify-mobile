import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { BudgetCategoryCard, SearchBarComponent } from '../../components/utils.budget';
import { Budget } from '../../components/modals/AddBudgetModal/budgetTypes';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabaseConfig';
import BudgetSkeleton from '../../components/BudgetSkeleton';
import { Colors } from '../../theme/theme';

const BudgetScreen: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        const fetchBudgets = async () => {
            if (user?.id) {
                const { data, error } = await supabase.from("budgets").select("*").eq("profile_id", user.id);

                if (error) {
                    console.error(`Error fetching budgets: ${error.message}`);
                }

                setBudgets(data as Budget[]);
                setLoading(false);
            }
        };

        fetchBudgets();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Include a Search Bar */}
            <SearchBarComponent onSearch={text => {/* handle search */ }} />

            {/* Map through each category and render a card */}

            {loading ? (
                <>
                    <BudgetSkeleton />
                    <BudgetSkeleton />
                </>
            ) : (
                <>
                    {
                        budgets.length > 0 ? (
                            <>
                                {budgets.map(budgetItem => (
                                    <BudgetCategoryCard
                                        key={budgetItem.id}
                                        budget={budgetItem}
                                    />
                                ))}
                            </>
                        ) : (
                            <Text style={styles.emptyListText}>No budgets found.</Text>
                        )
                    }
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    addButton: {
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8, // Give some space between the icon and text
    },

    progressBar: {
        marginBottom: 10,
    },

    budgetText: {
        fontSize: 16,
    },

    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    budgetTexts: {
        marginTop: 8,
    },
    budget: {
        fontSize: 16,
        color: 'green',
    },
    remaining: {
        fontSize: 16,
    },
    underBudget: {
        color: 'blue',
    },
    overBudget: {
        color: 'red',
    },
    emptyListText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        marginTop: 20,
    },
});

export default BudgetScreen;