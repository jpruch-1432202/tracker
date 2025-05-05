import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../constants/firebase';
import { useAuth } from './useAuth';

export interface Habit {
  id: string;
  name: string;
  userId: string;
}

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setHabits([]);
      return;
    }
    // Listen for real-time updates from Firestore for this user only
    const q = query(collection(db, 'habits'), where('userId', '==', user.uid), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHabits(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Habit, 'id'>),
          }))
          .filter((habit) => habit.userId === user.uid)
      );
    });
    return unsubscribe;
  }, [user]);

  const addHabit = async (name: string) => {
    if (!user) return;
    await addDoc(collection(db, 'habits'), { name, userId: user.uid });
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