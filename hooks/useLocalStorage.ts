import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const { user } = useAuth();

  const getStorageKey = () => user ? `${key}-${user.sub}` : `${key}-guest`;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const storageKey = getStorageKey();
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // This effect will run when the user logs in or out, updating the state
  // to reflect the data for the new user status.
  useEffect(() => {
     if (typeof window !== 'undefined') {
        try {
            const storageKey = getStorageKey();
            const item = window.localStorage.getItem(storageKey);
            setStoredValue(item ? JSON.parse(item) : initialValue);
        } catch (error) {
            console.error(error);
            setStoredValue(initialValue);
        }
    }
  }, [user]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        const storageKey = getStorageKey();
        window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}