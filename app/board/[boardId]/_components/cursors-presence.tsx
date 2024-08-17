'use client';
import { memo } from "react";
import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";

const Cursors=()=>{
    const ids=useOthersConnectionIds();
    return(
      <>
       {
         ids.map((connectionId)=>(
            <Cursor
            key={connectionId}
            connectionId={connectionId}
            
            />
         ))

       }
      </>
    );
}
export const CursorsPresence=memo(()=>{
  return(
    <>
    <p>
        {/* TODO:draft pencil */}
        <Cursors/>
    </p>
    </>
  )

})
CursorsPresence.displayName="CursorsPresence";