import { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';
import seedProperties from '../data/properties.js';

const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const propertiesRef = collection(db, 'properties');

    // One-time seed if the collection is empty, so the site isn't blank
    // on first run. Safe to remove once you've added real listings.
    // One-time seed, guarded by a flag doc so it can never run twice
    // (React Strict Mode runs effects twice in development).
    const seedIfEmpty = async () => {
      const seedFlagRef = doc(db, 'meta', 'seeded');
      const seedFlagSnap = await getDoc(seedFlagRef);
      if (seedFlagSnap.exists()) return;

      await setDoc(seedFlagRef, { done: true });
      for (const property of seedProperties) {
        const { id, ...rest } = property;
        await addDoc(propertiesRef, rest);
      }
    };
    seedIfEmpty();
    
    const unsubscribe = onSnapshot(propertiesRef, (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProperties(items);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addProperty = async (property) => {
    await addDoc(collection(db, 'properties'), property);
  };

  const updateProperty = async (id, updates) => {
    await updateDoc(doc(db, 'properties', id), updates);
  };

  const deleteProperty = async (id) => {
    await deleteDoc(doc(db, 'properties', id));
  };

  const getPropertyById = (id) => properties.find((p) => p.id === id);

  const getPropertiesByCategory = (slug) =>
    properties.filter((p) => p.categorySlug === slug);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        addProperty,
        updateProperty,
        deleteProperty,
        getPropertyById,
        getPropertiesByCategory,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  return useContext(PropertyContext);
}