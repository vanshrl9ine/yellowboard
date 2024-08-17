'use client'
import React, { useCallback, useState } from 'react'
import {Info} from './info'
import {Participants} from './participants'
import {Toolbar} from './toolbar'
import { useCanRedo, useCanUndo, useHistory, useSelf,useMutation, useStorage } from '@liveblocks/react/suspense'
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from '@/types/canvas'
import { CursorsPresence } from './cursors-presence'
import { penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds } from '@/lib/utils'
import { LiveObject } from '@liveblocks/client'
import {nanoid} from 'nanoid';
import {LayerPreview} from './layer-preview'
const MAX_LAYERS=100;
interface CanvasProps{
  boardId:string,
}
const Canvas = ({boardId}:CanvasProps) => {
   const layerIds=useStorage((root)=>root.layerIds);
   const [lastUsedColor, setlastUsedColor] = useState<Color>({r:0,g:0,b:0});
  

   const [canvasState,setCanvasState]=useState<CanvasState>({
    mode:CanvasMode.None,

   });
   const [camera,setCamera]=useState<Camera>({x:0,y:0});
   const history=useHistory();
   const canUndo=useCanUndo();
   const canRedo=useCanRedo();

   //layer functions
   const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");

      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor]
  );
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        pencilColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  const resizeSelectedLayer = useMutation(
    ({ self, storage }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );
      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

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
  const handlePointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) return;

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({
        origin: point,
        mode: CanvasMode.Pressing,
      });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );
  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);
  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (
        !pencilDraft ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({
        mode: CanvasMode.Pencil,
      });
    },
    [lastUsedColor]
  );

  const handlePointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayer();
        setCanvasState({
          mode: CanvasMode.None,
        });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }
      history.resume();
    },
    [
      camera,
      canvasState,
      history,
      insertLayer,
      unselectLayer,
      setCanvasState,
      insertPath,
    ]
  );

  const handleLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [setCanvasState, camera, history, canvasState.mode]
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
    onPointerLeave={handlePointerLeave}
    onPointerUp={handlePointerUp}
    onPointerDown={handlePointerDown}
    onWheel={handleWheel}
    >
      <g
      style={{
        transform: `translate(${camera.x}px, ${camera.y}px)`,
      }}
      >
        {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={handleLayerPointerDown}
              selectionColor="#000"
            />
          ))}
         <CursorsPresence/>
      </g>
    </svg>
    </main>
        
  )
}

export default Canvas