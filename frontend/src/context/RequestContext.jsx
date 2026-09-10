import { createContext, useContext } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

const RequestContext = createContext(null);

export function RequestProvider({ children }) {
  const submitRequest = async (data) => {
    await addDoc(collection(db, 'requests'), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });

    // Fire the confirmation email via the backend. If this fails
    // (backend not running, network issue), the request is still
    // safely saved in Firestore above — we just log the error.
    try {
      await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Could not reach backend for confirmation email:', err);
    }
  };

  return (
    <RequestContext.Provider value={{ submitRequest }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  return useContext(RequestContext);
}