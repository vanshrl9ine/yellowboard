import React from 'react'
import {Canvas} from './_components/canvas'
import { Room } from '@/components/room'
import { Divide } from 'lucide-react';
import { Loading } from '@/components/auth/loading';
interface BoardIdPageProps{
  params:{
    boardId:string,

  };
};
const BoardIdPage = ({params,}:BoardIdPageProps) => {
  
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Room roomId={params.boardId} fallback={<div className='h-full flex flex-col items-center justify-center'><Loading/></div>}>
      <Canvas boardId={params.boardId}/>
      </Room>
       
    </div>
     
  
  )
}

export default BoardIdPage