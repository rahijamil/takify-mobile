import React, { memo } from 'react';
import { Pressable, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Category } from './categories';

const CategoryCard = memo(({
  category,
  isSelected,
  onSelect
}: {
  category: Category,
  isSelected: boolean,
  onSelect: (category: Category) => void,
}) => {

  return (
    <Pressable
      onPress={() => onSelect(category)} style={styles.container}>
      <View
        style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}>
        <MaterialCommunityIcons
          name={category.icon}
          size={28}
          color={isSelected ? 'white' : '#333'}
        />
      </View>
      <Text
        style={styles.categoryCardText}>{category.name}</Text>
    </Pressable>
  )
});

const styles = StyleSheet.create({
  container: {
    width: 60,
  },
  categoryCard: {
    flex: 1,
    margin: 4,
    width: 60,
    height: 60,
    backgroundColor: '#ecf0f1',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  categoryCardText: {
    color: '#333',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center', // Ensure text is centered if it wraps to a new line
  },
  categoryCardSelected: {
    backgroundColor: '#007AFF',
  },
});

export default CategoryCard;