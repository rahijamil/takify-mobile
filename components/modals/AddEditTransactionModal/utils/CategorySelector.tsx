import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryCard from "../CategoryCard";
import { Category, DEBT_CATEGORY_GROUPS, EXPENSE_CATEGORY_GROUPS, INCOME_CATEGORY_GROUPS } from "../categories";
import { TransactionState, TransactionType } from '../transactionsTypes';
import { BudgetState } from '../../AddBudgetModal/budgetTypes';

interface CategorySelectorProps {
    onCategorySelect: (category: Category) => void;
    transaction: TransactionState | BudgetState;
    type: TransactionType;
}

interface Section {
    title: string;
    data: Category[];
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    onCategorySelect,
    transaction,
    type,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const category_groups = type === TransactionType.Expense
        ? EXPENSE_CATEGORY_GROUPS
        : type === TransactionType.Income
            ? INCOME_CATEGORY_GROUPS
            : DEBT_CATEGORY_GROUPS;

    // Memoized computation
    const sections = useMemo(() => category_groups.map(group => ({
        title: group.name,
        data: group.categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        icon: group.icon as keyof typeof MaterialCommunityIcons.glyphMap,
    })).filter(group => group.data.length > 0), [category_groups, searchTerm]);

    const renderCategory = useCallback(({ item }: { item: Category }) => (
        <View style={styles.cardWrapper}>
            <CategoryCard
                key={item.id}
                category={item}
                isSelected={item.name == transaction.category?.name}
                onSelect={() => onCategorySelect(item)}
            />
        </View>
    ), [transaction.category, onCategorySelect]);

    const renderSectionHeader = ({ section }: { section: Section }) => (
        <View style={styles.groupContainer}>
            <MaterialCommunityIcons name={section.icon} size={24} color="#007AFF" />
            <Text style={styles.groupTitle}>{section.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* <TextInput
                style={styles.searchBar}
                placeholder="Search categories"
                value={searchTerm}
                onChangeText={setSearchTerm}
            /> */}

            <FlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={sections}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        {renderSectionHeader({ section: item })}
                        <FlatList
                            data={item.data}
                            renderItem={renderCategory}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={4}
                            ListEmptyComponent={<Text>No categories found</Text>}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={4}
                maxToRenderPerBatch={1}
                windowSize={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        marginVertical: 10,
    },
    groupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
    },
    groupTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        color: "#333"
    },
    cardWrapper: {
        flex: 1, // Ensures that the card takes up equal space
        flexDirection: 'column',
        padding: 4, // Add padding for spacing between cards
    },
});

export default CategorySelector;
