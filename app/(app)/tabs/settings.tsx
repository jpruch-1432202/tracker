import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { useHabits } from '../../../hooks/useHabits';

export default function SettingsTabScreen() {
  const { habits, addHabit, deleteHabit } = useHabits();
  const { signOut } = useAuth();
  const [newHabitName, setNewHabitName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
          onPress: async () => {
            setDeletingId(habitId);
            try {
              await deleteHabit(habitId);
            } catch (err) {
              Alert.alert('Error', 'Failed to delete habit.');
            } finally {
              setDeletingId(null);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.addHabitCard}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new habit..."
          value={newHabitName}
          onChangeText={setNewHabitName}
          placeholderTextColor="#BFC0C0"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
          <Text style={styles.addButtonText}>Add Habit</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.habitCard}>
            <Text style={styles.habitName}>{item.name}</Text>
            <TouchableOpacity
              style={[styles.deleteButton, deletingId === item.id && { opacity: 0.6 }]}
              onPress={() => handleDeleteHabit(item.id)}
              disabled={deletingId === item.id}
            >
              {deletingId === item.id ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.deleteButtonText}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        style={styles.habitList}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 24,
    alignSelf: 'center',
    color: '#22223B',
    letterSpacing: 0.5,
  },
  addHabitCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#22223B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E1DD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: '#F6F8FC',
    fontSize: 16,
    color: '#22223B',
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  habitList: {
    flex: 1,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#22223B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E1DD',
  },
  habitName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4E69',
    letterSpacing: 0.2,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  logoutButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  logoutButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 