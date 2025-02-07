import { ReactNode } from "react";
import { Button } from "./ui/button";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog";

export default function DialogConfirm({
    title,
    description,
    affirmative,
    negative,
    handleClick,
    isLoading,
    children
}: {
    title: string;
    description: string;
    affirmative: string;
    negative: string;
    handleClick: () => void;
    isLoading: boolean;
    children: ReactNode; 
}) {
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline" type="button">
                            {negative}
                        </Button>
                    </DialogClose>
                    <DialogClose>
                        <Button
                            type="button"
                            onClick={handleClick}
                            disabled={isLoading}
                        >
                            {affirmative}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
