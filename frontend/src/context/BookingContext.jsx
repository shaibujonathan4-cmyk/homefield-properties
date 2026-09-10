import { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';

const CANCELLATION_FORFEIT_RATE = 0.04;

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBookings(items);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createBooking = async (booking) => {
    await addDoc(collection(db, 'bookings'), {
      status: 'pending', // pending -> completed | cancelled
      bookedAt: serverTimestamp(),
      ...booking,
    });

    // Mark the property as booked so it shows greyed out elsewhere.
    if (booking.propertyId) {
      await updateDoc(doc(db, 'properties', booking.propertyId), {
        status: 'booked',
      });
    }
  };

  const markCompleted = async (id, booking) => {
    const balanceDue = booking.price - booking.bookingFee;
    await updateDoc(doc(db, 'bookings', id), {
      status: 'completed',
      balanceDue,
      completedAt: serverTimestamp(),
    });
    // Property stays "booked" — the deal went through.
  };

  const markCancelled = async (id, booking) => {
    const forfeitAmount = booking.price * CANCELLATION_FORFEIT_RATE;
    const refundAmount = booking.bookingFee - forfeitAmount;
    await updateDoc(doc(db, 'bookings', id), {
      status: 'cancelled',
      forfeitAmount,
      refundAmount,
      cancelledAt: serverTimestamp(),
    });

    // Free up the property again since the deal fell through.
    if (booking.propertyId) {
      await updateDoc(doc(db, 'properties', booking.propertyId), {
        status: 'available',
      });
    }
  };

  const getBookingById = (id) => bookings.find((b) => b.id === id);

  return (
    <BookingContext.Provider
      value={{ bookings, loading, createBooking, markCompleted, markCancelled, getBookingById }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}