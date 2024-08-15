"use client";

import { Button } from "@/components/ui/button";
import { useOrganization, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import EmptyOrg from "./_components/empty-org";


interface DashboardProps{
  searchParams:{
    search?:string;
    favorites?:string;
  };
};
export default function DashboardPage({searchParams}:DashboardProps) {
  const {organization}=useOrganization();
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {JSON.stringify(searchParams)}
      {!organization?<EmptyOrg/>:<p>Board list</p>}
      
    </div>
  );
}
