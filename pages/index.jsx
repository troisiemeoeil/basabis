import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Player } from 'video-react';
import Upload from './upload'
import toast, { Toaster } from 'react-hot-toast';


function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Gallery() {
 const [project, setProject] = useState(null)

 useEffect(() => {
  async function fetchImages() {
    try {
      const response = await fetch('/api/getImages');
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        throw new Error('Failed to fetch images');
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchImages();
  // console.log(project);
}, []);
return (
  
  <div className="mx-auto flex flex-col gap-10 max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <div><Toaster/></div>
    <h2>Placeholder</h2>
    <Upload />
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {project && project.map((image, i) => (
        image.metadata.mimetype === "video/mp4" ?
        <Player key={i} >
        <source src={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/basabis/${image.name}`} />
        </Player>
        :
        <BlurImage key={image.id} image={image} />
      ))}
    </div>
  </div>
)
}

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true)
  const formatCreationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust this format based on your requirements
  };
  return (
    <a href={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/basabis/${image.name}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        
        <Image
          alt=""
          src={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/basabis/${image.name}`}
          layout="fill"
          objectFit="cover"
          property='true'
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className=' w-fit p-2  bg-gray-300 my-2 rounded-xl'>
        <p className='text-white text-sm'>{formatCreationDate(image.created_at)}</p>
      </div>
    </a>
  )
}
