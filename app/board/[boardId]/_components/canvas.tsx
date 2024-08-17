'use client'
import React, { useCallback, useState } from 'react'
import {Info} from './info'
import {Participants} from './participants'
import {Toolbar} from './toolbar'
import { useCanRedo, useCanUndo, useHistory, useSelf,useMutation, useStorage } from '@liveblocks/react/suspense'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { CursorsPresence } from './cursors-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'
const MAX_LAYERS=100;
interface CanvasProps{
  boardId:string,
}
const Canvas = ({boardId}:CanvasProps) => {
   const layerIds=useStorage((root)=>root.layerIds);
   
  

   const [canvasState,setCanvasState]=useState<CanvasState>({
    mode:CanvasMode.None,

   });
   const [camera,setCamera]=useState<Camera>({x:0,y:0});
   const history=useHistory();
   const canUndo=useCanUndo();
   const canRedo=useCanRedo();

   const handleWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const handlePointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);


      setMyPresence({ cursor: current });
    },
    [
      canvasState,
      
      camera,

    ]
  );
   
  
  return (
    <main
      className='h-full w-full relative bg-neutral-100 touch-none'
    >
 
    <Info boardId={boardId}/>
    <Participants/>
    <Toolbar
    canvasState={canvasState}
    setCanvasState={setCanvasState}
    canRedo={canRedo}
    canUndo={canUndo}
    undo={history.undo}
    redo={history.redo}
    />
    <svg 
    className='h-[100vh] w-[100vw]'
    onPointerMove={handlePointerMove}
    onWheel={handleWheel}
    >
      <g
      style={{
        transform: `translate(${camera.x}px, ${camera.y}px)`,
      }}
      >
         <CursorsPresence/>
      </g>
    </svg>
    </main>
        
  )
}

export default Canvas