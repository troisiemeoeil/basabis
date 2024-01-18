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
    const { data, error } = await supabase.storage
    .from('basabis')
    .list('', {
      limit: 9000,
      offset: 0,
    })
    // .range(0,10)
  
    if (error) {
      throw error;
    }
    const sortedFilesByDate = data.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      return dateB - dateA; // Sort in descending order (newest first)
    });
    // Process the data or send it directly
    res.status(200).json(sortedFilesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}