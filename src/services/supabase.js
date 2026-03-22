import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://ogxsiynfxxejxftllpgp.supabase.co';
const supabaseAnonKey = 'sb_publishable_7gVjAMYha9S30A01CGUwsw_JZM2Y9Ne';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample initial motorcycles
const initialMotorcycles = [
  {
    name: 'Haojue HJ150',
    brand: 'Haojue',
    price: 850000,
    description_en: 'Reliable and fuel-efficient motorcycle perfect for Nigerian roads.',
    description_ha: 'Babur mai ƙarfi kuma mai tanadin man fetur.',
    main_image_url: '',
    colors: [
      { name: 'Red', code: '#DC2626', quantity: 5, images: [] },
      { name: 'Black', code: '#1F2937', quantity: 8, images: [] }
    ],
    available: true
  },
  {
    name: 'Honda CG 125',
    brand: 'Honda',
    price: 950000,
    description_en: 'Legendary durability and fuel economy.',
    description_ha: 'Shahararren ƙarfi da tanadin man fetur.',
    main_image_url: '',
    colors: [
      { name: 'Black', code: '#1F2937', quantity: 10, images: [] },
      { name: 'Red', code: '#DC2626', quantity: 6, images: [] }
    ],
    available: true
  },
  {
    name: 'Lifan KPR 150',
    brand: 'Lifan',
    price: 780000,
    description_en: 'Sporty design with excellent performance.',
    description_ha: 'Zane mai wasa tare da kyakkyawan aiki.',
    main_image_url: '',
    colors: [
      { name: 'Green', code: '#10B981', quantity: 4, images: [] },
      { name: 'White', code: '#F3F4F6', quantity: 5, images: [] }
    ],
    available: true
  }
];

// Upload image to Supabase Storage
export const uploadImage = async (file, path) => {
  if (!file) return '';

  try {
    const fileName = `${path}_${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from('motorcycle-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return '';
    }

    const { data: publicUrlData } = supabase.storage
      .from('motorcycle-images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    return '';
  }
};

// Initialize database with sample data
export const initializeDatabase = async () => {
  try {
    const { count, error } = await supabase
      .from('motorcycles')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error checking table:', error);
      return false;
    }

    if (count === 0) {
      console.log('Adding sample motorcycles...');
      const { error: insertError } = await supabase
        .from('motorcycles')
        .insert(initialMotorcycles);

      if (insertError) {
        console.error('Insert error:', insertError);
        return false;
      }
      console.log('Sample data added successfully!');
    }
    return true;
  } catch (error) {
    console.error('Init error:', error);
    return false;
  }
};

// Load all motorcycles
export const loadMotorcycles = async () => {
  try {
    const { data, error } = await supabase
      .from('motorcycles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Load error:', error);
    return [];
  }
};

// Add a new motorcycle with local image upload
export const addMotorcycle = async (motorcycle, mainImageFile, colorImageFiles) => {
  try {
    // Upload main image from local device
    let mainImageUrl = '';
    if (mainImageFile) {
      mainImageUrl = await uploadImage(mainImageFile, `motorcycles/${Date.now()}/main`);
    }
    
    // Upload color images from local device
    const updatedColors = await Promise.all(
      motorcycle.colors.map(async (color, index) => {
        const colorImageFile = colorImageFiles[index];
        let images = [];
        if (colorImageFile) {
          const url = await uploadImage(colorImageFile, `motorcycles/${Date.now()}/color_${index}`);
          if (url) images = [url];
        }
        return {
          name: color.name,
          code: color.code,
          quantity: parseInt(color.quantity) || 0,
          images: images
        };
      })
    );
    
    const newMotorcycle = {
      name: motorcycle.name,
      brand: motorcycle.brand,
      price: parseInt(motorcycle.price),
      description_en: motorcycle.description_en || motorcycle.description || '',
      description_ha: motorcycle.description_ha || '',
      main_image_url: mainImageUrl,
      colors: updatedColors,
      available: true
    };
    
    const { data, error } = await supabase
      .from('motorcycles')
      .insert([newMotorcycle])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Add error:', error);
    throw error;
  }
};

// Delete a motorcycle
export const deleteMotorcycle = async (id) => {
  try {
    const { data: motorcycle } = await supabase
      .from('motorcycles')
      .select('main_image_url, colors')
      .eq('id', id)
      .single();

    if (motorcycle) {
      if (motorcycle.main_image_url) {
        const fileName = motorcycle.main_image_url.split('/').pop();
        await supabase.storage.from('motorcycle-images').remove([fileName]);
      }
      
      if (motorcycle.colors) {
        for (const color of motorcycle.colors) {
          if (color.images && color.images.length) {
            for (const imgUrl of color.images) {
              const fileName = imgUrl.split('/').pop();
              await supabase.storage.from('motorcycle-images').remove([fileName]);
            }
          }
        }
      }
    }

    const { error } = await supabase
      .from('motorcycles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

// Update motorcycle availability
export const updateAvailability = async (id, available) => {
  try {
    const { error } = await supabase
      .from('motorcycles')
      .update({ available })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};