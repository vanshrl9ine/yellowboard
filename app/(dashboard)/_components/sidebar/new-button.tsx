'use client';
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog";


import React from 'react'
import Hint from "@/components/hint";
import { Organization } from "@clerk/nextjs/server";

const NewButton = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <div className="aspect-square">
                <Hint label="Create Organization" side="right" align="start" sideOffset={18}>
                    <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                        <Plus className="text-white"/>
                    </button>
                </Hint>
            </div>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transaparent border-none max-w-[480px]">
            <CreateOrganization routing="hash"/>
        </DialogContent>
    </Dialog>
  )
}

export default NewButton