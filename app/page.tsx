"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import Image from "next/image";

export default function Home() {
  return(
    <div className="flex flex-col gap-y-4">
      <div>
        This is a screen for authenticated users only
      </div>
      <div>
        <UserButton/>
      </div>

    </div>
  )
}
