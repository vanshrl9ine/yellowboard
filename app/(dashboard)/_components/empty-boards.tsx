
'use client'
import React from 'react';
import { AppWindow, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
const EmptyBoards = () => {
  const create=useMutation(api.board.create);
  const {organization}=useOrganization();

  const onClick=()=>{
    if(!organization)return;
    create({
      orgId:organization.id,
      title:"Untitled"
    })
  }
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-3">
      <AppWindow className="h-[100px] w-[100px]" />
      <div>
        <h4>Create your first board</h4>
      </div>
      <div className="mt-6 ">
        <Button onClick={onClick}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
