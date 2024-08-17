
'use client';
import React from 'react';
import ToolButton from './tool-button';
import { Circle, Ellipsis, MousePointer2, Pen, RectangleEllipsis, Redo, Redo2, Square, StickyNote, Type, Undo, Undo2 } from 'lucide-react';


import { CanvasState } from '@/types/canvas';

interface ToolbarProps{
  canvasState:CanvasState;
  setCanvasState:(newState:CanvasState)=>void;
  undo:()=>void
  redo:()=>void
  canUndo:boolean,
  canRedo:boolean

}

export const Toolbar = ({canvasState,setCanvasState,undo,redo,canRedo,canUndo}:ToolbarProps) => {
  return (
    <div className="fixed top-1/2 left-2 -translate-y-1/2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
         label="Select"
         icon={MousePointer2}
         onClick={()=>{}}
         isActive={false}
        />
        <ToolButton
         label="Text"
         icon={Type}
         onClick={()=>{}}
         isActive={false}
        />
        <ToolButton
         label="Sticky Note"
         icon={StickyNote}
         onClick={()=>{}}
         isActive={false}
        />
        <ToolButton
         label="Rectangle"
         icon={Square}
         onClick={()=>{}}
         isActive={false}
        />
        <ToolButton
         label="Ellipse"
         icon={Circle}
         onClick={()=>{}}
         isActive={false}
        />
        <ToolButton
         label="Pen"
         icon={Pen}
         onClick={()=>{}}
         isActive={false}
        />
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
      <ToolButton
         label="Undo"
         icon={Undo2}
         onClick={undo}
         isDisabled={!canUndo}
        />
        <ToolButton
         label="Redo"
         icon={Redo2}
         onClick={redo}
         isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};
export const ToolbarSkeleton=()=>{
  return(
    <div className="fixed top-1/2 left-2 -translate-y-1/2 flex flex-col gap-y-4 bg-white h-[300px] w-[52px] shadow-md rounded-md"/>
    
  
  )
}
