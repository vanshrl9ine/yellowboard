'use client';
import { useRenameModal } from "@/store/use-rename-modal";
import { DialogFooter,DialogClose,DialogTrigger,DialogContent, Dialog, DialogHeader, DialogDescription } from "../ui/dialog";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UseApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal=()=>{
    const {mutate,pending}=UseApiMutation(api.board.update);
    const {isOpen,onClose,initialValues}=useRenameModal();
    const [title,setTitle]=useState(initialValues.title);
    useEffect(()=>{
         setTitle(initialValues.title);
    },[initialValues.title]);

    const onSubmit:FormEventHandler<HTMLFormElement>=(e,)=>{
      e.preventDefault();
      mutate({
        id:initialValues.id,
        title,
      })
      .then(()=>{
        toast.success("Board renamed")
        onClose();
      })
      .catch(()=>{
        toast.error("Failed to Rename Board")
      })
    };
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTrigger>
                        Edit board title
                    </DialogTrigger>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                   <Input
                    placeholder="Enter title"
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}    
                   />
                   <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={pending} type="submit">
                        Save
                    </Button>
                   </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    );
}