import { useEffect, useState } from 'react';

const getStorageValue = (key: any) => {
    // getting stored value
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      try {
        const initial = saved !== null ? JSON.parse(saved) : [];
        return initial;
      } catch (err) {
        console.log(err)
      }
    }
  }

  export const useLocalStorage = (key: any) => {
    const [value, setValue] = useState(() => {
      return getStorageValue(key);
    });

    useEffect(() => {
      // storing input name
      localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
  };