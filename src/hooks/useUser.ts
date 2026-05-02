import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserStats } from '../types';

export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setStats(null);
        setLoading(false);
      }
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    
    const unsubStats = onSnapshot(userDocRef, async (snap) => {
      if (snap.exists()) {
        setStats(snap.data() as UserStats);
      } else {
        const initialStats: UserStats = {
          uid: user.uid,
          displayName: user.displayName || 'Learner',
          photoURL: user.photoURL || '',
          energy: 5,
          maxEnergy: 5,
          sparkPoints: 0,
          streak: 0,
          lastActive: new Date().toISOString(),
          onboardingComplete: false,
        };
        await setDoc(userDocRef, initialStats);
        setStats(initialStats);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setLoading(false);
    });

    return () => unsubStats();
  }, [user]);

  const updateStats = async (updates: Partial<UserStats>) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, updates, { merge: true });
  };

  return { user, stats, loading, updateStats };
}
