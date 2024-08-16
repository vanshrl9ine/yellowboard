'use client';
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { AlertDialog,AlertDialogCancel,AlertDialogContent,AlertDialogFooter,AlertDialogHeader,AlertDialogTrigger,AlertDialogTitle, AlertDialogDescription } from "./ui/alert-dialog";


interface ConfirmModalProps{
    children:React.ReactNode,
    onConfirm:()=>void,
    disabled?:boolean,
    header:string,
    description?:string,


}
export const ConfirmModal=({children,onConfirm,disabled,header,description}:ConfirmModalProps)=>{
    const handleConfirm=()=>{
        onConfirm();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {header}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                        disabled={disabled}
                        onClick={handleConfirm}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}