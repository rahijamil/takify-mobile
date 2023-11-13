import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Transaction, TransactionType } from '../../components/modals/AddEditTransactionModal/transactionsTypes';

import {
  BarChartData,
  RecentTransactions
} from '../../components/utils.dashboad';
import { supabase } from '../../config/supabaseConfig';

// Prepare data for the pie chart
const colors = ['#FF7043', '#42A5F5', '#9CCC65', '#FFCA28', '#26C6DA', '#7E57C2'];


interface ChartDataItem {
  key: string;
  value: number;
  svg: { fill: string };
  arc: { outerRadius: string; innerRadius: string };
}

// Define an interface for the accumulator object in your reduce function
interface ExpensesByMonthAccumulator {
  [key: string]: { monthYear: string; total: number };
}

const groupExpensesByMonth = (transactions: Transaction[]): BarChartData[] => {
  const expensesByMonth = transactions
    .filter((transaction) => transaction.type === TransactionType.Expense)
    .reduce<ExpensesByMonthAccumulator>((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      const year = new Date(transaction.date).getFullYear();
      const monthYear = `${year}-${month + 1}`; // Month is 0-indexed
      if (!acc[monthYear]) {
        acc[monthYear] = { monthYear, total: 0 };
      }
      acc[monthYear].total += transaction.amount;
      return acc;
    }, {});

  return Object.values(expensesByMonth).map<BarChartData>((item) => {
    // Format the monthYear string into a more readable format if needed
    const date = new Date(item.monthYear);
    const formatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
    const month = formatter.format(date);
    return {
      value: item.total,
      svg: { fill: 'black' }, // Placeholder color
      month: month,
    };
  });
};

const DashboardScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);

  const [financialData, setFinancialData] = useState<{
    balance: number;
    income: number;
    expenses: number;
  }>({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);

  useEffect(() => {
    setTransactionsLoading(true);
    const fetchTransactions = async () => {
      const { data, error } = await supabase.from("transactions").select("*").limit(5);

      if (error) console.error(`Error fetching transactions: ${error.message}`);

      setTransactions(data as Transaction[]);
      setTransactionsLoading(false);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const income = transactions
      .filter((transaction) => transaction.type === TransactionType.Income)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expensesByCategory: Record<string, number> = transactions
      .filter((transaction) => transaction.type === TransactionType.Expense)
      .reduce((acc: Record<string, number>, curr) => {
        // Extract the category name safely
        const categoryName = curr.category ? curr.category.name : 'Uncategorized';
        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += curr.amount;
        return acc;
      }, {});

    const categories = Object.keys(expensesByCategory);
    setExpenseCategories(categories);

    const expenses = Object.values(expensesByCategory).reduce((acc, curr) => acc + curr, 0);

    setFinancialData({
      balance: income - expenses,
      income: income,
      expenses: expenses,
    });

    // Prepare and set data for the pie chart
    const preparedChartData: ChartDataItem[] = Object.keys(expensesByCategory).map((categoryName, index) => ({
      key: `pie-${index}`,
      value: expensesByCategory[categoryName],
      svg: { fill: colors[index % colors.length] },
      arc: { outerRadius: '95%', innerRadius: '60%' },
    }));

    setChartData(preparedChartData); // Update the chartData state

    const barData = groupExpensesByMonth(transactions);
    setBarChartData(barData);

  }, [transactions]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <RecentTransactions
        recentTransactions={transactions}
        transactionsLoading={transactionsLoading}
        financialData={financialData}
        barChartData={barChartData}
        chartData={chartData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
});

export default DashboardScreen;
