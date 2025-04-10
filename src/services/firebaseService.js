import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

// Clients
export const clientsService = {
  async getAll() {
    const clientsRef = collection(db, 'clients');
    const snapshot = await getDocs(clientsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const docRef = doc(db, 'clients', id);
    const docSnap = await getDocs(docRef);
    return { id: docSnap.id, ...docSnap.data() };
  },

  async create(clientData) {
    const clientsRef = collection(db, 'clients');
    return await addDoc(clientsRef, {
      ...clientData,
      createdAt: serverTimestamp()
    });
  },

  async update(id, clientData) {
    const docRef = doc(db, 'clients', id);
    return await updateDoc(docRef, clientData);
  },

  async delete(id) {
    const docRef = doc(db, 'clients', id);
    return await deleteDoc(docRef);
  }
};

// Appointments
export const appointmentsService = {
  async getAll() {
    const appointmentsRef = collection(db, 'appointments');
    const snapshot = await getDocs(appointmentsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getByDate(date) {
    const appointmentsRef = collection(db, 'appointments');
    const q = query(appointmentsRef, where('date', '==', date));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(appointmentData) {
    const appointmentsRef = collection(db, 'appointments');
    return await addDoc(appointmentsRef, {
      ...appointmentData,
      createdAt: serverTimestamp()
    });
  }
};

// Inventory
export const inventoryService = {
  async getAll() {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(productData, imageFile) {
    let imageUrl = null;
    if (imageFile) {
      const storageRef = ref(storage, `products/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const productsRef = collection(db, 'products');
    return await addDoc(productsRef, {
      ...productData,
      imageUrl,
      createdAt: serverTimestamp()
    });
  },

  async update(id, productData, imageFile) {
    let updateData = { ...productData };
    
    if (imageFile) {
      const storageRef = ref(storage, `products/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      updateData.imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = doc(db, 'products', id);
    return await updateDoc(docRef, updateData);
  }
};

// Coupons
export const couponsService = {
  async getAll() {
    const couponsRef = collection(db, 'coupons');
    const snapshot = await getDocs(couponsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(couponData) {
    const couponsRef = collection(db, 'coupons');
    return await addDoc(couponsRef, {
      ...couponData,
      createdAt: serverTimestamp(),
      usageCount: 0
    });
  },

  async validateCoupon(code) {
    const couponsRef = collection(db, 'coupons');
    const q = query(couponsRef, where('code', '==', code));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const coupon = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    const now = new Date();
    const validUntil = new Date(coupon.validUntil);
    
    return now <= validUntil ? coupon : null;
  }
};

// Financial
export const financialService = {
  async getTransactions(startDate, endDate) {
    const transactionsRef = collection(db, 'transactions');
    const q = query(
      transactionsRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addTransaction(transactionData) {
    const transactionsRef = collection(db, 'transactions');
    return await addDoc(transactionsRef, {
      ...transactionData,
      createdAt: serverTimestamp()
    });
  }
};

// Notes
export const notesService = {
  async getAll() {
    const notesRef = collection(db, 'notes');
    const snapshot = await getDocs(notesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(noteData) {
    const notesRef = collection(db, 'notes');
    return await addDoc(notesRef, {
      ...noteData,
      createdAt: serverTimestamp()
    });
  },

  async update(id, noteData) {
    const docRef = doc(db, 'notes', id);
    return await updateDoc(docRef, {
      ...noteData,
      updatedAt: serverTimestamp()
    });
  },

  async delete(id) {
    const docRef = doc(db, 'notes', id);
    return await deleteDoc(docRef);
  }
};

// Settings
export const settingsService = {
  async getUserSettings(userId) {
    const docRef = doc(db, 'settings', userId);
    const docSnap = await getDocs(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  async updateSettings(userId, settingsData) {
    const docRef = doc(db, 'settings', userId);
    return await updateDoc(docRef, {
      ...settingsData,
      updatedAt: serverTimestamp()
    });
  }
};
