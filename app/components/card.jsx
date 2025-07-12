import React from 'react'
import Image from 'next/image'
import { CardSpotlight } from '@/components/ui/card-spotlight'
function Card({image,title,des}) {
  return (
    <CardSpotlight className='w-80 flex flex-col justify-center items-center gap-2 backdrop-blur-2xl bg-black/10 border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]'>
        <Image src={image} alt={title} className='h-10 w-10 relative'></Image>
        <p className='text-lg font-sans font-semibold relative text-primary'>{title}</p>
        <p className='font-mono relative text-center text-sm text-secondary'>{des}</p>
    </CardSpotlight>
  )
}

export default Card