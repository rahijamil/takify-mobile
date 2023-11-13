// utils.dashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Transaction } from './modals/AddEditTransactionModal/transactionsTypes';
import { Colors } from '../theme/theme';
import * as Progress from 'react-native-progress';
import { useAuth } from '../contexts/AuthContext';
import { TransactionItem } from '../app/(tabs)/two';
import { supabase } from '../config/supabaseConfig';
import { Budget } from './modals/AddBudgetModal/budgetTypes';
import TransactionSkeleton from './TransactionSkeleton';
import BudgetSkeleton from './BudgetSkeleton';

// Interfaces and Types
export interface ChartDataItem {
    key: string;
    value: number;
    svg: { fill: string };
    arc: { outerRadius: string; innerRadius: string };
}

export interface BarChartData {
    value: number;
    svg: { fill: string };
    month: string;
}

export interface ExpensesByMonthAccumulator {
    [key: string]: { monthYear: string; total: number };
}

export type SummaryCardProps = {
    title: string;
    amount: string;
    iconName: keyof typeof MaterialCommunityIcons.glyphMap;
};

export type RecentTransactionsProps = {
    recentTransactions: Transaction[];
    transactionsLoading: boolean;
    financialData: {
        balance: number;
        income: number;
        expenses: number;
    },
    barChartData: BarChartData[],
    chartData: ChartDataItem[]
};

export type SearchBarProps = {
    onSearch: (query: string) => void;
};

// Dummy types for demonstration
type Notification = { id: string; message: string; };
type Bill = { id: string; name: string; dueDate: string; amount: number; };
type Insight = {
    id: string;
    title: string;
    content: string;
    trend: 'up' | 'down' | 'steady';
    advice: string;
};

// Component interfaces
export interface NotificationComponentProps {
    notifications: Notification[];
}

export interface UpcomingBillsProps {
    bills: Bill[];
}

export interface FinancialInsightProps {
    insights: Insight[];
}

// Components
const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, iconName }) => {
    return (
        <View style={styles.summaryCard}>
            <MaterialCommunityIcons name={iconName} size={32} color={Colors.accent} />
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardAmount}>{amount}</Text>
            </View>
        </View>
    );
};

const NotificationComponent: React.FC<NotificationComponentProps> = ({ notifications }) => {
    return (
        <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.notificationItem}>
                    <Text style={styles.notificationText}>{item.message}</Text>
                </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ recentTransactions, financialData, barChartData, chartData, transactionsLoading }) => {

    const renderTransactionItem = ({ item }: { item: Transaction }) => <TransactionItem item={item} />;
    
    const keyExtractor = (item: Transaction) => item.id;

    const handleSearch = () => { }
    const calculateFinancialInsights = () => { }

    // Add the missing components based on your list
    const renderSearchBar = () => (
        <SearchBar onSearch={handleSearch} />
    );

    const renderNotifications = () => (
        <NotificationComponent notifications={[]} />
    );

    const renderSummaryCards = () => (
        <View style={styles.summaryCardsContainer}>
            <SummaryCard
                title="Current Balance"
                amount={financialData.balance.toFixed(2)}
                iconName="wallet"
            />
            <SummaryCard
                title="Total Income"
                amount={financialData.income.toFixed(2)}
                iconName="arrow-up"
            />
            <SummaryCard
                title="Total Expenses"
                amount={financialData.expenses.toFixed(2)}
                iconName="arrow-down"
            />
        </View>
    );

    // const Gradient = () => (
    //     <Defs key="gradient">
    //         <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="100%">
    //             <>
    //                 <Stop offset="0%" stopColor="#4B9AFC" stopOpacity={0.7} />
    //                 <Stop offset="100%" stopColor="#4B9AFC" stopOpacity={0.3} />
    //             </>
    //         </LinearGradient>
    //     </Defs>
    // );

    // Define the props that CustomSlice expects
    type CustomSliceProps = {
        slice: any; // Replace `any` with the specific type expected for `slice`
        index: number;
        highlightIndex?: number; // Make this optional or provide a default value if it makes sense for your use case
    };

    const highlightIndex = 0;

    // const CustomSlice: React.FC<CustomSliceProps> = ({ slice, index, highlightIndex }) => {
    //     const { labelCentroid, data } = slice;
    //     return (
    //         <G key={index}>
    //             <Circle
    //                 cx={labelCentroid[0]}
    //                 cy={labelCentroid[1]}
    //                 r={highlightIndex === index ? 28 : 24} // Adjust the radius for highlight effect
    //                 fill={data.svg.fill}
    //             />
    //             {/* You could also add text or additional elements here */}
    //         </G>
    //     );
    // };

    // const renderCharts = () => (
    //     <View style={{ marginTop: 20 }}>
    //         {/* Bar Chart for Expenses */}
    //         <Text style={styles.sectionTitle}>Expenses</Text>

    //         <View style={styles.barChartContainer}>
    //             <BarChart
    //                 style={styles.barChart}
    //                 data={barChartData}
    //                 yAccessor={({ item }) => item.value}
    //                 xScale={scale.scaleBand}
    //                 contentInset={{ top: 10, bottom: 10 }}
    //                 spacingInner={0.2}
    //                 gridMin={0}
    //                 animate={true}
    //                 animationDuration={500}
    //                 svg={{ fill: 'url(#barGradient)' }}
    //             >
    //                 <Grid direction={Grid.Direction.HORIZONTAL} />
    //                 <Gradient />
    //             </BarChart>


    //             {/* Labels for the x-axis */}
    //             <View style={styles.xAxisLabelContainer}>
    //                 {barChartData.map((entry, index) => (
    //                     <Text key={`label-${index}`} style={styles.xAxisLabel}>
    //                         {entry.month}
    //                     </Text>
    //                 ))}
    //             </View>

    //         </View>

    //         {/* Pie Chart */}
    //         {/* <PieChart
    //             style={styles.chart}
    //             data={chartData}
    //             valueAccessor={({ item }) => item.value}
    //             padAngle={0.02}
    //             innerRadius="50%"
    //             outerRadius="90%"
    //             animate={true}
    //             animationDuration={500}
    //         >
    //             {chartData.map((slice, index) => (
    //                 <CustomSlice
    //                     slice={slice}
    //                     index={index}
    //                     highlightIndex={highlightIndex}
    //                 />
    //             ))}
    //         </PieChart> */}
    //     </View>
    // );

    const renderBudgetTracking = () => (
        <BudgetTracker />
    );

    const renderUpcomingBills = () => (
        <UpcomingBills bills={[
            {
                id: '1',
                name: 'Groceries',
                dueDate: '2023-06-10',
                amount: 1000,
            },
            {
                id: '2',
                name: 'Car Insurance',
                dueDate: '2023-06-15',
                amount: 500,
            }
        ]} />
    );

    const renderFinancialInsights = () => (
        <FinancialInsight insights={[
            {
                id: '1',
                title: 'Monthly Spending',
                content: 'Your spending has increased by 15% compared to last month.',
                trend: 'up',
                advice: 'Consider reviewing your recent transactions for any unnecessary expenses.',
            },
            {
                id: '2',
                title: 'Budget Tracking',
                content: 'Your budget has decreased by 10% compared to last month.',
                trend: 'down',
                advice: 'Consider increasing your budget to stay on track.',
            },
            {
                id: '3',
                title: 'Financial Health',
                content: 'Your financial health is in good shape.',
                trend: 'steady',
                advice: 'Keep up the good work!',
            }
        ]} />
    );

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good Morning";
        } else if (hour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    // In your component
    const Header: React.FC<{ userName: string }> = ({ userName }) => {
        const greeting = getCurrentGreeting();

        return (
            <View style={styles.headerContainer}>
                <Text style={styles.welcomeBack}>
                    {greeting}, <Text style={styles.userName}>{userName || "User"}</Text>
                </Text>
            </View>
        );
    };

    const ListHeader = () => {
        const { user } = useAuth();

        return (
            <>
                <Header userName={user?.display_name ? user.display_name.split(" ")[0] : ""} />

                {/* Quick Summary Cards */}
                {renderSummaryCards()}

                <Text style={styles.sectionTitle}>Recent Transactions</Text>

                {transactionsLoading ? (
                    <>
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                    </>
                ) : null}

                {/* Search Bar */}
                {/* {renderSearchBar()} */}
                {/* Notifications */}
                {/* {renderNotifications()} */}
            </>
        )
    }


    return (
        <View style={styles.transactionItem}>
            <FlatList
                data={recentTransactions}
                renderItem={renderTransactionItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={
                    <>
                        {/* Spending Overview Chart */}
                        {/* {renderCharts()} */}
                        {/* Budget Tracking */}
                        {renderBudgetTracking()}
                        {/* Upcoming Bills or Scheduled Transactions */}
                        {/* {renderUpcomingBills()} */}
                        {/* Financial Insights */}
                        {/* {renderFinancialInsights()} */}

                        <View style={{ height: 100 }} />
                    </>
                }
                // Remove contentContainerStyle if it causes any issues with your layout
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <View style={styles.searchBarContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color="#333" />
            <TextInput
                placeholder="Search..."
                style={styles.searchInput}
                onChangeText={onSearch}
            />
        </View>
    );
};

const BudgetTracker = () => {
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
        <View style={styles.budgetContainer}>
            <Text style={styles.sectionTitle}>Budget Tracking</Text>
            {loading ? (
                <>
                    <BudgetSkeleton />
                    <BudgetSkeleton />
                </>
            ) : (
                budgets.map((budget) => (
                    <Card key={budget.id} style={styles.budgetCard}>
                        <Text style={styles.budgetCategory}>{budget.category?.name}</Text>
                        <Progress.Bar
                            progress={budget.spent / budget.budget}
                            width={null}
                            color={Colors.accent}
                            unfilledColor={Colors.lightGrey}
                            borderWidth={0}
                            borderRadius={5}
                        />
                        <Text style={styles.budgetAmount}>${budget.spent} of ${budget.budget}</Text>
                    </Card>
                ))
            )}
        </View>
    );
};

const UpcomingBills: React.FC<UpcomingBillsProps> = ({ bills }) => {
    return (
        <View style={styles.billsContainer}>
            <Text style={styles.sectionTitle}>Upcoming Bills</Text>

            {bills.map((bill) => (
                <Card key={bill.id} style={styles.billCard}>
                    <Text style={styles.billName}>{bill.name}</Text>
                    <Text style={styles.billDueDate}>Due: {bill.dueDate}</Text>
                    <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
                </Card>
            ))}
        </View>
    );
};

const FinancialInsight: React.FC<FinancialInsightProps> = ({ insights }) => {
    return (
        <View style={styles.insightsContainer}>
            <Text style={styles.sectionTitle}>Financial Insights</Text>
            {insights.map((insight) => (
                <Card key={insight.id} style={styles.insightCard}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <Text style={styles.insightContent}>{insight.content}</Text>
                    <View style={styles.trendIndicator}>
                        <MaterialCommunityIcons
                            name={insight.trend === 'up' ? 'trending-up' :
                                insight.trend === 'down' ? 'trending-down' : 'trending-neutral'}
                            size={20}
                            color={insight.trend === 'up' ? Colors.positive :
                                insight.trend === 'down' ? Colors.negative : Colors.neutral}
                        />
                        <Text style={styles.insightTrend}>
                            {insight.trend === 'up' ? 'Increase' :
                                insight.trend === 'down' ? 'Decrease' : 'No Change'}
                        </Text>
                    </View>
                    <Text style={styles.insightAdvice}>{insight.advice}</Text>
                </Card>
            ))}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryCard: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 16,
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 4,
    },
    budgetCard: {
        backgroundColor: Colors.lightBackground, // Define this color in your Colors file
        marginVertical: 4,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
    },
    budgetCategory: {
        fontSize: 18,
        color: Colors.text,
        fontWeight: '600',
    },
    budgetAmount: {
        fontSize: 16,
        color: Colors.secondary,
        fontWeight: '500',
    },
    billsContainer: {
        marginTop: 20
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    cardAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    cardIcon: {
        color: '#4B9AFC', // Icon color that matches your theme
    },
    cardTextContainer: {
        justifyContent: 'center',
    },
    notificationItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 15,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    notificationText: {
        fontSize: 14,
        color: '#333',
    },
    barChart: {
        height: 200,
        width: '100%',
        borderRadius: 10, // Round corners for chart
        overflow: 'hidden', // Ensures the rounded corners effect is applied
    },
    chart: {
        height: 220,
        marginBottom: 20,
        padding: 10, // Add padding to make the chart less cramped
        borderRadius: 10, // Round corners for chart
        backgroundColor: '#fff', // Optional background color
    },
    actionButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007bff',
        borderRadius: 30,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 7,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    budgetContainer: {
        marginTop: 20,
    },
    insightsContainer: {
        marginTop: 20
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginVertical: 8,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)', // subtle border for depth
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ecf0f1',
    },
    icon: {
        alignSelf: 'center',
        marginRight: 10,
    },
    notification: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    barChartContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    xAxisLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    xAxisLabel: {
        fontSize: 10,
        color: '#666',
    },
    welcomeBack: {
        fontSize: 22,
        fontWeight: '300', // Lighter font weight
        color: '#333',
    },
    userName: {
        fontWeight: 'bold', // Bold for the user's name
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.primary,
        paddingVertical: 16,
    },
    summaryCardsContainer: {
        marginBottom: 20,
    },
    recentTransactionsContainer: {},
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        backgroundColor: '#ecf0f1',
    },
    tabIcon: {
        padding: 10,
    },
    transactionItem: {},
    billCard: {
        backgroundColor: Colors.lightBackground, // Define this color in your Colors file
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    billName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    billDueDate: {
        fontSize: 14,
        color: Colors.textSecondary, // Define this color in your Colors file
        marginTop: 4,
    },
    billAmount: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.text,
        marginTop: 8,
    },
    insightCard: {
        backgroundColor: Colors.lightBackground, // Define this color in your Colors file
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    insightTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    insightContent: {
        fontSize: 14,
        color: Colors.text,
        marginVertical: 4,
    },
    trendIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    insightTrend: {
        fontSize: 14,
        marginLeft: 4,
        fontWeight: '600',
    },
    insightAdvice: {
        fontSize: 12,
        color: Colors.secondary,
        fontStyle: 'italic',
        marginTop: 8,
    },
});

export {
    SummaryCard,
    NotificationComponent,
    RecentTransactions,
    SearchBar,
    BudgetTracker,
    UpcomingBills,
    FinancialInsight,
};