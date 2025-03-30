"use client"

import { Button } from "@/components/ui/button"
import { HistoryVideosSection } from "../sections/history-videos-section"
import { LikedVideosSection } from "../sections/liked-videos-section"
import { PlusIcon } from "lucide-react"
import { PlaylistCreateModel } from "../components/playlist-create-modal"
import { useState } from "react"

export const PlaylistsView = () => {

    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
            <PlaylistCreateModel open={createModalOpen} onOpenChange={setCreateModalOpen} />
            <div className="flex justify-between items-center">
                <div>
                    <h1 className=" text-2xl font-bold">
                        Playlists
                    </h1>
                    <p className=" text-xs text-muted-foreground">
                        Collections you have created
                    </p>
                 </div>
            </div>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setCreateModalOpen(true)}
            >
                <PlusIcon />
                
            </Button>
          
        </div>
    )
}