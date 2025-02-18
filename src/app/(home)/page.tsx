import Image from "next/image";
import {Button} from "@/components/ui/button"
export default function Home() {
  return (
    <div>
     <Image src = "/logo.png" height = {50} width={50} alt="logo" />
     <p className="text-xl font-semibold tracking-tight">
      YouTubebb
     </p>
    </div>
  )
}
