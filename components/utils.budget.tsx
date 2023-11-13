// utils.budget.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, Modal } from 'react-native';
import { ProgressBar, Card } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors, Typography } from '../theme/theme';
import { Category } from './modals/AddEditTransactionModal/categories';
import { Budget } from './modals/AddBudgetModal/budgetTypes';

// Progress Bar Component
export const BudgetProgressBar = ({ budget, spent }: { budget: number; spent: number }) => {
    const progressPercent = (spent / budget) * 100;
    const progressColor = progressPercent > 100 ? '#ff4136' : '#2ecc40';

    return (
        <ProgressBar progress={progressPercent} color={progressColor} />
    );
};

interface BudgetCategoryCardProps {
    budget: Budget;
}

export const BudgetCategoryCard: React.FC<BudgetCategoryCardProps> = ({ budget }) => {
    const progress = budget.spent / budget.budget;
    const progressColor = progress > 1 ? Colors.negative : Colors.positive;

    return (
        <Card style={styles.categoryCard}>
            <View style={styles.cardContent}>
                <MaterialCommunityIcons name={budget.category?.icon} size={24} color={Colors.text} />
                <View style={styles.cardDetails}>
                    <Text style={styles.categoryName}>{budget.category?.name}</Text>
                    <ProgressBar
                        progress={progress}
                        color={progressColor}
                        style={styles.progressBar}
                    />
                    <View style={styles.budgetDetails}>
                        <Text style={styles.budgetLabel}>Budgeted: ${budget.budget.toFixed(2)}</Text>
                        <Text style={[styles.spent, { color: progressColor }]}>
                            ${budget.spent.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

// Chart Component
export const BudgetChartComponent = ({ data }: { data: any }) => (
    <AnimatedCircularProgress
        size={120}
        width={15}
        fill={data.percentage}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('Animation Completed')}
        backgroundColor="#3d5875"
    >
        {fill => <Text>{data.label}</Text>}
    </AnimatedCircularProgress>
);


// Search Bar Component
export const SearchBarComponent = ({ onSearch }: { onSearch: (text: string) => void }) => (
    <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={20}  color={'#333'} />
        <TextInput
            placeholder="Search..."
            onChangeText={onSearch}
            style={styles.searchInput}
        />
    </View>
);

// Modal Component for Details and Editing
export const DetailModalComponent = ({ isVisible, transaction, onClose }: { isVisible: boolean, transaction: any, onClose: () => void }) => (
    <Modal visible={isVisible} onRequestClose={onClose}>
        <View>
            <Text>{transaction.description}</Text>
            {/* ... additional modal content */}
        </View>
    </Modal>
);

// Add your styles for each component here
const styles = StyleSheet.create({
    budgetItem: {
        backgroundColor: Colors.lightBackground,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#2F4F4F',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.1,
        elevation: 5,
    },
    category: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2F4F4F',
        marginBottom: 10,
    },
    progressBarWrapper: {
        position: 'relative',
    },
    budgetAmount: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2F4F4F',
    },
    categoryCard: {
        backgroundColor: Colors.lightBackground,
        borderRadius: 8,
        marginVertical: 4,
        padding: 16,
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
      },
      cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      cardDetails: {
        flex: 1,
        marginLeft: 16,
      },
      categoryName: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
      },
      progressBar: {
        height: 20,
        borderRadius: 10,
        marginTop: 10,
      },
      budgetDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      budgetLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
      },
      spent: {
        fontSize: 14,
        fontWeight: '500',
      },
    transactionList: {
        padding: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: Colors.text,
        // fontFamily: Typography.secondary,
    },
    insights: {
        margin: 10,
    },
});

