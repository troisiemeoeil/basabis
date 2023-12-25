import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Player } from 'video-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Gallery({ images }) {
 const [project, setProject] = useState(null)

 useEffect(() => {
  async function fetchImages() {
    try {
      const response = await fetch('/api/getImages');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
  <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {project && project.map((image, i) => (
        image.metadata.mimetype === "image/jpeg" ?
        <BlurImage key={image.id} image={image} />
        // <img key={i} src={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/images/${image.name}`} />
        :
//         <CldVideoPlayer
//   width="1920"
//   height="1080"
//   src={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/images/${image.name}`}
// />
<Player>
<source src={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/images/${image.name}`} />
</Player>
        // <h2>nada</h2>
      ))}
    </div>
  </div>
)
}

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/images/${image.name}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        
        <Image
          alt=""
          src={`https://eencnukfilboslmuzsbm.supabase.co/storage/v1/object/public/images/${image.name}`}
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
        <p>{image.created_at}</p>
    </a>
  )
}
