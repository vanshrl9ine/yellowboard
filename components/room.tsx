"use client";

import { ReactNode } from "react";

import { useSelf } from "@liveblocks/react/suspense";
import { Loading } from "./auth/loading";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import {  LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface RoomProps{
    children:React.ReactNode,
    roomId:string;
    fallback:NonNullable<React.ReactNode> | null
}
export function Room({ children,roomId,fallback }: RoomProps) {
  // const info = useSelf((me) => me.info);
  // console.log(info);
  
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <RoomProvider 
      id={roomId} 
      initialPresence={{cursor:null,selection:[]}}
      initialStorage={
      {
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }
    }
      
      
      >
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}