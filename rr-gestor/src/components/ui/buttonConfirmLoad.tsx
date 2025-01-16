import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";



export function ButtonConfirmLoad({ isLoading, loadingText, defaultText }: { isLoading: boolean, loadingText: string, defaultText: string }) {
    return (
        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" />: ""}
            {isLoading ? loadingText : defaultText}
        </Button>
    );
}