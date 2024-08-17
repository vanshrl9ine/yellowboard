'use client';
import { memo } from "react";
import { shallow, useOthersConnectionIds, useOthersMapped } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";
import { colorToCss } from "@/lib/utils";
import { Path } from "./path";

const Cursors = () => {
    const ids = useOthersConnectionIds();
  
    return (
      <>
        {ids.map((id) => (
          <Cursor key={id} connectionId={id} />
        ))}
      </>
    );
  };
  const Draft = () => {
    const others = useOthersMapped(
      (other) => ({
        pencilDraft: other.presence.pencilDraft,
        pencilColor: other.presence.pencilColor,
      }),
      shallow
    );
  
    return (
      <>
        {others.map(([key, other]) => {
          if (other.pencilDraft) {
            return (
              <Path
                key={key}
                x={0}
                y={0}
                points={other.pencilDraft}
                fill={other.pencilColor ? colorToCss(other.pencilColor) : "#000"}
              />
            );
          }
          return null;
        })}
      </>
    );
  };
  export const CursorsPresence = memo(() => {
    return (
      <>
        <Draft/>
        <Cursors />
      </>
    );
  });
  
  CursorsPresence.displayName = "CursorPresence";