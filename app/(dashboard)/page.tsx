"use client";

import { Button } from "@/components/ui/button";
import { useOrganization, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import EmptyOrg from "./_components/empty-org";

export default function Home() {
  const {organization}=useOrganization();
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization?<EmptyOrg/>:<p>Board list</p>}
      
    </div>
  );
}
