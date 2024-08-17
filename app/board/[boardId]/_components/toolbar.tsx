
'use client';
import React from 'react';

export const Toolbar = () => {
  return (
    <div className="fixed top-1/2 left-2 -translate-y-1/2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div>Pencil</div>
        <div>Square</div>
        <div>Circle</div>
        <div>Ellipsis</div>
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
         <div>
          Undo
         </div>
         <div>
          Redo
         </div>
      </div>
    </div>
  );
};
export const ToolbarSkeleton=()=>{
  return(
    <div className="fixed top-1/2 left-2 -translate-y-1/2 flex flex-col gap-y-4 bg-white h-[300px] w-[52px] shadow-md rounded-md"/>
    
  
  )
}
