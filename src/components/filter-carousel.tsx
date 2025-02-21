"use client"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect} from "react";


interface FilterCarouselProps{
    value?: string | null;
    isLoading?: boolean;
    onSelect?: (value: string | null) => void;
    data:{
        value: string;
        label: string;
    }[];
}

export const FilterCarousel = ({
    value,
    isLoading,
    onSelect,
    data,
}:FilterCarouselProps) =>{
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect( () => {
        if(!api){
            return;
        }
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () =>{
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);
    return(
        <div className="relative w-full">
            {/** left fade */}
            <div className={cn(
                "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none", current === 1 && "hidden"
            )}>
                
            </div>
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full px-12"
            >
                <CarouselContent className="-ml-3">
                    <CarouselItem className="pl-3 basis-auto">
                        <Badge variant={value === null ? "default" : "secondary"} 
                                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm">
                            All
                        </Badge>
                    </CarouselItem>
                    {data.map( (item) => (
                        <CarouselItem key={item.value} className="pl-3 basis-auto ">
                            <Badge variant={value === item.value ? "default" : "secondary"} className="ounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm">
                                {item.label}
                            </Badge>
                        </CarouselItem>
                    ) )}
                </CarouselContent>
                <CarouselPrevious className="left-0 z-20" />
                <CarouselNext className="right-0 z-20"/>
            </Carousel>
            {/** Right fade */}
            <div className={cn(
                "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none", current === count && "hidden"
            )}>
            </div>
        </div>
    )

}