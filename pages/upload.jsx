import { createClient } from '@supabase/supabase-js'
import toast, { Toaster } from 'react-hot-toast';


const supabase = createClient('https://eencnukfilboslmuzsbm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbmNudWtmaWxib3NsbXV6c2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NDI2ODUsImV4cCI6MjAxOTAxODY4NX0.ljRdsDQlsjHiaxRJ5ZPCrRhvxgipnR1PZOJIoYZkcSw')
  // Function to track upload progress
  const onProgress = (file, event) => {
    const progress = (event.loaded / event.total) * 100;
    console.log(`File ${file.name} progress: ${Math.round(progress)}%`);
  };
async function uploadImages(e) {
  const toastId = toast.loading('Basabis going to ze clouds 👨‍🚀✨');
  // toast.loading('Basabis going to ze clouds 👨‍🚀✨');

    const fileList = e.target.files;
    const uploadedImages = Array.from(fileList);
    console.log(uploadedImages);
    const promises = uploadedImages.map(async (image) => {
        const { data, error } = await supabase.storage
        .from('basabis')
        .upload(`${image.name}`, image, {
          onProgress: (event) => onProgress(image, event),
        });
        if (error) {
          console.error('Error uploading image:', error);
        }
        return data;
      });
      await Promise.all(promises);
      toast.dismiss(toastId);
      toast.success("Basabis landed on ze clouds ☁️")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
}

export default function Upload() {
  return (
    <div>
        <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden"  onChange={uploadImages} multiple />
    </label>
    </div>
    </div>

  )
}
