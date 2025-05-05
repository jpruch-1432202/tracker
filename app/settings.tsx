import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useHabits } from '../hooks/useHabits';

export default function SettingsScreen() {
  const { habits, addHabit, deleteHabit } = useHabits();
  const [newHabitName, setNewHabitName] = useState('');

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit(newHabitName.trim());
      setNewHabitName('');
    }
  };

  const handleDeleteHabit = (habitId: string) => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteHabit(habitId),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.addHabitContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new habit name"
          value={newHabitName}
          onChangeText={setNewHabitName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
          <Text style={styles.addButtonText}>Add Habit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteHabit(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
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
  addHabitContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  habitList: {
    flex: 1,
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  habitName: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 