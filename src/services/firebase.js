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
  limit,
  orderBy
} from 'firebase/firestore';

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClvv9XRj7iMlwelUDdAyNuixGM8LBISAo",
  authDomain: "motorcyclecatalog-7ceba.firebaseapp.com",
  projectId: "motorcyclecatalog-7ceba",
  storageBucket: "motorcyclecatalog-7ceba.firebasestorage.app",
  messagingSenderId: "301201115492",
  appId: "1:301201115492:web:f49d37631b72cd748f5271",
};

// Initializing Firebase
let app;
let db;
let isFirebaseInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isFirebaseInitialized = true;
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  isFirebaseInitialized = false;
}

const motorcyclesCollection = db ? collection(db, 'motorcycles') : null;

// Sample of the initial motorcycles data
const initialMotorcycles = [
  {
    name: 'Haojue HJ150',
    brand: 'Haojue',
    price: 850000,
    description_en: 'The Haojue HJ150 is a reliable and fuel-efficient motorcycle perfect for Nigerian roads. Features include powerful engine, comfortable seat, and excellent suspension.',
    description_ha: 'Haojue HJ150 babu mai ƙarfi kuma mai tanadin man fetur, ya dace da hanyoyin Najeriya.',
    mainImage: '',
    colors: [
      { name: 'Red', code: '#DC2626', quantity: 5, images: [] },
      { name: 'Black', code: '#1F2937', quantity: 8, images: [] },
      { name: 'Blue', code: '#3B82F6', quantity: 3, images: [] }
    ],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Honda CG 125',
    brand: 'Honda',
    price: 950000,
    description_en: 'The legendary Honda CG 125 is known for its durability and fuel economy. Perfect for daily commuting and commercial use.',
    description_ha: 'Shahararren Honda CG 125 an san shi da ƙarfi da tanadin man fetur.',
    mainImage: '',
    colors: [
      { name: 'Black', code: '#1F2937', quantity: 10, images: [] },
      { name: 'Red', code: '#DC2626', quantity: 6, images: [] },
      { name: 'Silver', code: '#9CA3AF', quantity: 4, images: [] }
    ],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Lifan KPR 150',
    brand: 'Lifan',
    price: 780000,
    description_en: 'Sporty design with excellent performance. Great value for money with modern features.',
    description_ha: 'Zane mai wasa tare da kyakkyawan aiki. Yana ba da ƙima mai kyau ga kuɗi.',
    mainImage: '',
    colors: [
      { name: 'Green', code: '#10B981', quantity: 4, images: [] },
      { name: 'White', code: '#F3F4F6', quantity: 5, images: [] }
    ],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    price: 2450000,
    description_en: 'Premium classic motorcycle with timeless design. Powerful engine and exceptional build quality.',
    description_ha: 'Babbar babur mai daraja tare da zane na zamani. Inji mai ƙarfi da ingantaccen gini.',
    mainImage: '',
    colors: [
      { name: 'Battleship Grey', code: '#6B7280', quantity: 2, images: [] },
      { name: 'Black', code: '#1F2937', quantity: 3, images: [] }
    ],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Haojue GN125',
    brand: 'Haojue',
    price: 720000,
    description_en: 'Compact and economical, perfect for city riding. Excellent fuel efficiency and easy maintenance.',
    description_ha: 'Karami kuma mai tattalin arziki, cikakke don hawan birni. Ingancin man fetur da sauƙin kula.',
    mainImage: '',
    colors: [
      { name: 'Red', code: '#DC2626', quantity: 7, images: [] },
      { name: 'Black', code: '#1F2937', quantity: 9, images: [] }
    ],
    available: true,
    createdAt: new Date().toISOString()
  }
];

// Helper function to convert image file to base64
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Initializing database with sample data
export const initializeDatabase = async () => {
  if (!isFirebaseInitialized || !db) {
    console.log('Firebase not initialized, using localStorage fallback');
    return false;
  }

  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 5000);
    });

    const checkPromise = async () => {
      const snapshot = await getDocs(query(motorcyclesCollection, limit(1)));
      if (snapshot.empty) {
        console.log('Adding sample motorcycles...');
        for (const bike of initialMotorcycles) {
          await addDoc(motorcyclesCollection, bike);
        }
        console.log('Sample data added!');
      }
      return true;
    };

    await Promise.race([checkPromise(), timeoutPromise]);
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

// Load all motorcycles
export const loadMotorcycles = async () => {
  if (!isFirebaseInitialized || !db) {
    console.log('Firebase not available');
    return [];
  }

  try {
    const q = query(motorcyclesCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const motorcycles = [];
    snapshot.forEach((doc) => {
      motorcycles.push({ id: doc.id, ...doc.data() });
    });
    return motorcycles;
  } catch (error) {
    console.error('Error loading motorcycles:', error);
    return [];
  }
};

// Add a new motorcycle
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
          const base64 = await imageToBase64(colorImageFile);
          colorImages = [base64];
        }
        return {
          ...color,
          images: colorImages
        };
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
    return { id: docRef.id, ...newMotorcycle };
  } catch (error) {
    console.error('Error adding motorcycle:', error);
    throw error;
  }
};

// Delete a motorcycle
export const deleteMotorcycle = async (id) => {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firebase not initialized');
  }

  try {
    const motorcycleDoc = doc(db, 'motorcycles', id);
    await deleteDoc(motorcycleDoc);
    return true;
  } catch (error) {
    console.error('Error deleting motorcycle:', error);
    throw error;
  }
};

// Update motorcycle availability
export const updateAvailability = async (id, available) => {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firebase not initialized');
  }

  try {
    const motorcycleDoc = doc(db, 'motorcycles', id);
    await updateDoc(motorcycleDoc, { available });
    return true;
  } catch (error) {
    console.error('Error updating motorcycle:', error);
    throw error;
  }
};