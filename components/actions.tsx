'use client'
import { Link2, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator } from "./ui/dropdown-menu"
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { toast } from "sonner"
import { UseApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { ConfirmModal } from "./confirm-modal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"

interface ActionProps{
    children:React.ReactNode,
    side?:DropdownMenuContentProps["side"],
    sideOffset?:DropdownMenuContentProps["sideOffset"],
    id:string,
    title:string
}
export const Actions=({children,side,sideOffset,id,title}:ActionProps)=>{
    const {onOpen}=useRenameModal();
    const  {mutate,pending}=UseApiMutation(api.board.remove);
    const onDelete=()=>{
        mutate({
            id
        })
        .then(()=>toast.success("Successfully Deleted Card"))
        .catch(()=>toast.error("Error Deleting Card"))
    }


    const onCopyLink=()=>{
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
        .then(()=>{
            toast.success("Link Copied")
        })
        .catch(()=>toast.error("Failed to copy link"))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
             onClick={(e)=>e.stopPropagation()}
             side={side}
             sideOffset={sideOffset}
             className="w-60"
            >
              <DropdownMenuItem
              onClick={onCopyLink}
              className="p-3 cursor-pointer"
              >
                <Link2
                 className="h-4 w-4 mr-2"
                />
                Copy Board Link
                </DropdownMenuItem> 
                <DropdownMenuItem
              onClick={()=>{onOpen(id,title)}}
              className="p-3 cursor-pointer"
              >
                <Pencil
                 className="h-4 w-4 mr-2"
                />
               Rename
                </DropdownMenuItem> 
                <ConfirmModal
                 header="Delete board?"
                 description="This will delete this board and all of its contents"
                 disabled={pending}
                 onConfirm={onDelete}
                >
                        <Button 
                          variant="ghost"
                          
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2
                        className="h-4 w-4 mr-2"
                        />
                        Delete
                        </Button> 
                </ConfirmModal>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}