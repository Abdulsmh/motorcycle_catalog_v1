import { createClient } from '@supabase/supabase-js';

// CORRECT URL - ends with .co
const supabaseUrl = 'https://ogxsiynfxxejxftllpgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neHNpeW5meHhlanhmdGxscGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzU4NDYsImV4cCI6MjA4OTc1MTg0Nn0.E2rwYBRkiZ0mhYePMZY9CAXhoQ1VBQ_4PkiX2faTTgU';  // Your actual publishable key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  }
];

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
      console.log('Sample data added!');
    }
    return true;
  } catch (error) {
    console.error('Init error:', error);
    return false;
  }
};

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

export const addMotorcycle = async (motorcycle, mainImageFile, colorImageFiles) => {
  try {
    let mainImageUrl = '';
    if (mainImageFile) {
      mainImageUrl = await uploadImage(mainImageFile, `motorcycles/${Date.now()}/main`);
    }
    
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
      price: parseInt(motorcycle.price) || 0,
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