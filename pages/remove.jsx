import React from 'react'
import { createClient } from '@supabase/supabase-js'
import toast, { Toaster } from 'react-hot-toast';

const supabase = createClient(
'https://eencnukfilboslmuzsbm.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbmNudWtmaWxib3NsbXV6c2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NDI2ODUsImV4cCI6MjAxOTAxODY4NX0.ljRdsDQlsjHiaxRJ5ZPCrRhvxgipnR1PZOJIoYZkcSw')

export default function Remove({title}) {
    async function  removeImage(e) {
        console.log(`/${title}`);
        let targetDiv = e.currentTarget.parentNode.parentNode.parentNode
        const { data, error } = await supabase
            .storage
            .from('basabis')
            .remove([`${title}`])
    console.log(targetDiv);
    targetDiv.remove();
    toast.error("A basbous got YEEEEEETED 🥺")

    }

  return (
    <div>
          <button className='w-fit p-2 bg-white rounded-md text-sm' onClick={removeImage} data={title}>remove a basbous</button>
      
    </div>
  )
}
