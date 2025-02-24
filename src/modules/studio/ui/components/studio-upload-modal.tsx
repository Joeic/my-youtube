"use client"

import { PlusIcon } from "lucide-react"
import {Button} from "@/components/ui/button";

export const StudioUploadModal = () => {
    return (
        <Button variant="secondary" className="cursor-pointer">
            <PlusIcon />
            Create
        </Button>
    );
};