import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from '../../theme/theme';
import { supabase } from '../../config/supabaseConfig';
import { Transaction, TransactionType } from '../../components/modals/AddEditTransactionModal/transactionsTypes';

import TransactionDetails from '../../components/modals/TransactionsDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import moment from 'moment';
import TransactionSkeleton from '../../components/TransactionSkeleton';

const initialLayout = { width: Dimensions.get('window').width };

export const TransactionItem = ({ item }: { item: Transaction }) => {
    const [transactionId, setTransactionId] = useState<string | null>(null);

    return (
        <>
            <TouchableOpacity onPress={() => setTransactionId(item.id)} activeOpacity={0.7}>
                <View style={[styles.transactionCard, item.type == TransactionType.Expense ? styles.expenseItem : item.type == TransactionType.Income ? styles.incomeItem : styles.debtItem]}>
                    <View style={styles.transactionRow}>
                        <View style={{ backgroundColor: "#ecf0f1", padding: 8, borderRadius: 30 }}>
                            <MaterialCommunityIcons
                                name={item.category?.icon ? item.category.icon : "cart"}
                                size={24}
                                color="#333"
                            />
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionTitle}>{item.note}</Text>
                            <Text style={styles.transactionSubtitle}>{moment(item.date).format('DD MMM YYYY')}</Text>
                        </View>
                        <Text style={[styles.transactionAmount, item.type == TransactionType.Expense ? styles.expense : item.type == TransactionType.Income ? styles.income : styles.debt]}>
                            <MaterialCommunityIcons name="currency-bdt" size={16} />
                            {item.amount.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {transactionId === item.id && (
                <TransactionDetails
                    transaction={item}
                    onClose={() => setTransactionId(null)}
                />
            )}
        </>
    );
};

const TransactionRoute = ({ type }: { type: TransactionType }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTransactionsLoading(true);

        // Fetch transactions based on the type (Expense, Income, or Debt)
        const fetchTransactions = async () => {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('type', type);

            if (error) {
                console.error(`Error fetching ${type} transactions: ${error.message}`);
                return;
            }

            setTransactions(data);
            setTransactionsLoading(false);
        };

        fetchTransactions();
    }, [type]);

    // Render the list of transactions of the given type
    return (
        <>
            {
                transactionsLoading ? (
                    <>
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                    </>
                ) : (
                    <FlatList
                        data={transactions}
                        renderItem={({ item }) => <TransactionItem item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={
                            <Text style={styles.emptyListText}>No {type} transactions found.</Text>
                        }
                    />
                )
            }

        </>
    );
};

const renderScene = SceneMap({
    first: () => <TransactionRoute type={TransactionType.Expense} />,
    second: () => <TransactionRoute type={TransactionType.Income} />,
    third: () => <TransactionRoute type={TransactionType.Debt} />,
});

// Main Component: TransactionsScreen
const TransactionsScreen = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Expenses' },
        { key: 'second', title: 'Income' },
        { key: 'third', title: 'Debt' },
    ]);

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
        <TabView
            style={styles.container}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
        />
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    transactionCard: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    transactionDetails: {
        flex: 1,
        marginLeft: 15,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    transactionSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    expense: {
        color: '#ff6347',
    },
    income: {
        color: '#2e8b57',
    },
    debt: {
        color: '#ff6347',
    },
    emptyListText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        marginTop: 20,
    },
    tabBar: {
        backgroundColor: 'white',
    },
    label: {
        fontWeight: 'bold',
    },
    indicator: {
        backgroundColor: Colors.primary,
    },
    expenseItem: {
        // backgroundColor: '#ffebee', // a light red background color for expenses
    },
    incomeItem: {
        // backgroundColor: '#e8f5e9', // a light green background color for incomes
    },
    debtItem: {
        // backgroundColor: '#ecf0f1', // a light green background color for incomes
    },
});


export default TransactionsScreen;