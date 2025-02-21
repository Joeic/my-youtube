"use client"

import { trpc } from "@/trpc/client"
import { useEffect } from "react"
import { text } from "stream/consumers"

export const  PageClient = () => {
    const [data] = trpc.hello.useSuspenseQuery({
        text: "JoeJoeJoe"
    })

 
    return(
        <div>
          page client says {data.greeting}
        </div>
    )
}