import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  limit
} from 'firebase/firestore';

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyClvv9XRj7iMlwelUDdAyNuixGM8LBISAo",
  authDomain: "motorcyclecatalog-7ceba.firebaseapp.com",
  projectId: "motorcyclecatalog-7ceba",
  storageBucket: "motorcyclecatalog-7ceba.firebasestorage.app",
  messagingSenderId: "301201115492",
  appId: "1:301201115492:web:f49d37631b72cd748f5271",
};

console.log('Firebase Config Loaded');

// Initialize Firebase
let db;
let isFirebaseInitialized = false;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isFirebaseInitialized = true;
  console.log('✅ Firebase initialized successfully!');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  isFirebaseInitialized = false;
}

const motorcyclesCollection = db ? collection(db, 'motorcycles') : null;

// Sample motorcycles data
const initialMotorcycles = [
  {
    name: 'Haojue HJ150',
    brand: 'Haojue',
    price: 850000,
    description_en: 'Reliable and fuel-efficient motorcycle perfect for Nigerian roads.',
    description_ha: 'Babur mai ƙarfi kuma mai tanadin man fetur.',
    mainImage: '',
    colors: [
      { name: 'Red', code: '#DC2626', quantity: 5, images: [] },
      { name: 'Black', code: '#1F2937', quantity: 8, images: [] }
    ],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Honda CG 125',
    brand: 'Honda',
    price: 950000,
    description_en: 'Legendary durability and fuel economy.',
    description_ha: 'Shahararren ƙarfi da tanadin man fetur.',
    mainImage: '',
    colors: [
      { name: 'Black', code: '#1F2937', quantity: 10, images: [] },
      { name: 'Red', code: '#DC2626', quantity: 6, images: [] }
    ],
    available: true,
    createdAt: new Date().toISOString()
  }
];

export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

export const initializeDatabase = async () => {
  if (!isFirebaseInitialized || !db) {
    console.warn('Firebase not initialized');
    return false;
  }

  try {
    const snapshot = await getDocs(query(motorcyclesCollection, limit(1)));
    if (snapshot.empty) {
      console.log('Adding sample motorcycles...');
      for (const bike of initialMotorcycles) {
        await addDoc(motorcyclesCollection, bike);
      }
      console.log('Sample data added!');
    }
    return true;
  } catch (error) {
    console.error('Init error:', error);
    return false;
  }
};

export const loadMotorcycles = async () => {
  if (!isFirebaseInitialized || !db) {
    console.warn('Firebase not available');
    return [];
  }

  try {
    const snapshot = await getDocs(motorcyclesCollection);
    const motorcycles = [];
    snapshot.forEach((doc) => {
      motorcycles.push({ id: doc.id, ...doc.data() });
    });
    console.log(`Loaded ${motorcycles.length} motorcycles`);
    return motorcycles;
  } catch (error) {
    console.error('Load error:', error);
    return [];
  }
};

export const addMotorcycle = async (motorcycle, mainImageFile, colorImageFiles) => {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firebase not initialized');
  }

  try {
    let mainImageBase64 = '';
    if (mainImageFile) {
      mainImageBase64 = await imageToBase64(mainImageFile);
    }
    
    const updatedColors = await Promise.all(
      motorcycle.colors.map(async (color, index) => {
        const colorImageFile = colorImageFiles[index];
        let colorImages = [];
        if (colorImageFile) {
          colorImages = [await imageToBase64(colorImageFile)];
        }
        return { ...color, images: colorImages };
      })
    );
    
    const newMotorcycle = {
      ...motorcycle,
      mainImage: mainImageBase64,
      colors: updatedColors,
      available: true,
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(motorcyclesCollection, newMotorcycle);
    console.log('Added motorcycle:', docRef.id);
    return { id: docRef.id, ...newMotorcycle };
  } catch (error) {
    console.error('Add error:', error);
    throw error;
  }
};

export const deleteMotorcycle = async (id) => {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firebase not initialized');
  }

  try {
    await deleteDoc(doc(db, 'motorcycles', id));
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export const updateAvailability = async (id, available) => {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firebase not initialized');
  }

  try {
    await updateDoc(doc(db, 'motorcycles', id), { available });
    return true;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};