
'use client'
import React from 'react';
import { AppWindow, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import { UseApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';

const EmptyBoards = () => {
  const {organization}=useOrganization();
  const {mutate,pending}=UseApiMutation(api.board.create);
  
   
  const onClick=()=>{
    if(!organization)return;
    mutate({
      orgId:organization.id,
      title:"Untitled"
    })
    .then((id)=>{
      toast.success("Board created");
      //TODO:redirect to board
    })
    .catch(()=>toast.error("failed to create board"))
  }
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-3">
      <AppWindow className="h-[100px] w-[100px]" />
      <div>
        <h4>Create your first board</h4>
      </div>
      <div className="mt-6 ">
        <Button disabled={pending} onClick={onClick}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
