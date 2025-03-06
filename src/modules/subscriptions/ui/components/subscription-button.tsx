import {cn} from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface SubscriptionButtonProps{
    onClick: ButtonProps["onClick"];
    disaled:boolean;
    isSubscribed: boolean;
    className?: string;
    size?: ButtonProps["size"];
}

export const SubscriptionButton = ({
    onClick,
    disaled,
    isSubscribed,
    className,
    size

}:SubscriptionButtonProps) =>{
    return(
        <Button 
            size={size} 
            variant={isSubscribed ? "secondary" : "default"} 
            className={cn("rounded-full", className)}   
            onClick={onClick} 
            disabled={disaled}
        >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
    )
}