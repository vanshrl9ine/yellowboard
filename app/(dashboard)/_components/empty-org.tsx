import React from 'react'
import { CircleOff } from 'lucide-react'
import { CreateOrganization } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Dialog,DialogContent,DialogTrigger } from '@/components/ui/dialog'
const EmptyOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-3'>
    <CircleOff  className='h-[100px] w-[100px]'/>
    <div>
        <h4>
            Create an Organization to get started!
        </h4>
        
    </div>
    <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              Create Organization
            </Button>

          </DialogTrigger>
          <DialogContent className='p-0 bg-transparent border-none  max-w-[480px]'>
              <CreateOrganization/>
          </DialogContent>
        </Dialog>
    </div>
   

    </div>
  )
}

export default EmptyOrg