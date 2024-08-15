'use client'
import { Link2, Trash2 } from "lucide-react"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator } from "./ui/dropdown-menu"
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { toast } from "sonner"
import { UseApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"

interface ActionProps{
    children:React.ReactNode,
    side?:DropdownMenuContentProps["side"],
    sideOffset?:DropdownMenuContentProps["sideOffset"],
    id:string,
    title:string
}
export const Actions=({children,side,sideOffset,id,title}:ActionProps)=>{

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
              onClick={onDelete}
              className="p-3 cursor-pointer"
              >
                <Trash2
                 className="h-4 w-4 mr-2"
                />
                Delete
                </DropdownMenuItem> 
            </DropdownMenuContent>
        </DropdownMenu>
    )
}