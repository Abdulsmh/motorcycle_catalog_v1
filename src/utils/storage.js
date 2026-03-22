// Use Supabase for fast, shared data
export { 
  loadMotorcycles, 
  addMotorcycle, 
  deleteMotorcycle, 
  updateAvailability,
  initializeDatabase
} from '../services/supabase';