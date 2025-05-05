import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../constants/firebase';

interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  lastCompleted: string;
}

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'habits'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const habitsArr: Habit[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        habitsArr.push({
          id: doc.id,
          name: data.name,
          completed: data.completed,
          streak: data.streak,
          lastCompleted: data.lastCompleted,
        });
      });
      setHabits(habitsArr);
    });
    return () => unsubscribe();
  }, []);

  const addHabit = async () => {
    if (newHabit.trim()) {
      const habit = {
        name: newHabit.trim(),
        completed: false,
        streak: 0,
        lastCompleted: '',
      };
      try {
        await addDoc(collection(db, 'habits'), habit);
        setNewHabit('');
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  const toggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const wasCompleted = habit.completed;
        const newCompleted = !wasCompleted;
        const newStreak = newCompleted ? 
          (habit.lastCompleted === today ? habit.streak : habit.streak + 1) : 
          habit.streak;
        
        return {
          ...habit,
          completed: newCompleted,
          streak: newStreak,
          lastCompleted: newCompleted ? today : habit.lastCompleted,
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new habit"
          value={newHabit}
          onChangeText={setNewHabit}
        />
        <TouchableOpacity style={styles.addButton} onPress={addHabit}>
          <Text style={styles.buttonText}>Add Habit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <TouchableOpacity 
              style={[styles.habitButton, item.completed && styles.completedHabit]}
              onPress={() => toggleHabit(item.id)}
            >
              <Text style={styles.habitText}>{item.name}</Text>
              <Text style={styles.streakText}>Streak: {item.streak}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteHabit(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  habitButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
  },
  completedHabit: {
    backgroundColor: '#d4edda',
  },
  habitText: {
    fontSize: 16,
  },
  streakText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
  },
}); 