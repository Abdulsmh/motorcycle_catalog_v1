// Use Supabase for fast, shared data with local image upload
export { 
  loadMotorcycles, 
  addMotorcycle, 
  deleteMotorcycle, 
  updateAvailability,
  updateMotorcyclePrice,   
  updateMotorcycleColors,   
  initializeDatabase
} from '../services/supabase';