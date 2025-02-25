import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [isIntersecting, setIsIntersection ] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect( () => {
        const observer = new IntersectionObserver( ([entry]) => {
            setIsIntersection(entry.isIntersecting);
        }, options);
        if(targetRef.current){
            observer.observe(targetRef.current);
        }

        return () => observer.disconnect();
    }, [options]);

    return {targetRef, isIntersecting};
}