// pages/api/getImages.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client

const supabase =  createClient(
    'https://eencnukfilboslmuzsbm.supabase.co',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbmNudWtmaWxib3NsbXV6c2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NDI2ODUsImV4cCI6MjAxOTAxODY4NX0.ljRdsDQlsjHiaxRJ5ZPCrRhvxgipnR1PZOJIoYZkcSw'
    )

export default async function handler(req, res) {
  try {
    // Fetch images from the storage bucket
    const { data, error } = await supabase.storage.from('basabis').list();
    console.log(data);
    if (error) {
      throw error;
    }

    // Process the data or send it directly
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}