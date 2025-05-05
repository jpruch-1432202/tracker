import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useHabits } from '../../../hooks/useHabits';

export default function HabitsTabScreen() {
  const { habits } = useHabits();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>My Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.habitCard}>
            <Text style={styles.habitName}>{item.name}</Text>
          </View>
        )}
        style={styles.habitList}
      />
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
}); 