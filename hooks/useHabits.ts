import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../constants/firebase';

export interface Habit {
  id: string;
  name: string;
}

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    // Listen for real-time updates from Firestore
    const q = query(collection(db, 'habits'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHabits(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Habit, 'id'>),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const addHabit = async (name: string) => {
    await addDoc(collection(db, 'habits'), { name });
  };

  const deleteHabit = async (id: string) => {
    await deleteDoc(doc(db, 'habits', id));
  };

  return {
    habits,
    addHabit,
    deleteHabit,
  };
}; 