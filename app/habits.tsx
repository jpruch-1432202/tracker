import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useHabits } from '../hooks/useHabits';

export default function HabitsScreen() {
  const { habits } = useHabits();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitName}>{item.name}</Text>
          </View>
        )}
        style={styles.habitList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  habitList: {
    flex: 1,
  },
  habitItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  habitName: {
    fontSize: 16,
  },
}); 