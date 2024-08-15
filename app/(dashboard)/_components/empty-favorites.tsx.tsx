import React from 'react';
import { ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-3">
      <ThumbsDown className="h-[100px] w-[100px]" />
      <div>
        <h4>No favorites to show</h4>
      </div>
    </div>
  );
};

export default EmptyFavorites;
