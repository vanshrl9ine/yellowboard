
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'
import { Info, InfoSkeleton } from './info'
import { Participants, ParticipantsSkeleton } from './participants'
import { Toolbar, ToolbarSkeleton } from './toolbar'
export const Loading = () => {

  return (

   <main className='h-full w-full relative bg-neutral-100 touch-none flex  flex-col items-center justify-center'
   >
    <Loader className='h-6 w-6 text-muted-foreground animate-spin flex flex-col items-center justify-center'/>
    <InfoSkeleton/>
    <ParticipantsSkeleton/>
    <ToolbarSkeleton/>
   </main>
  )
}

