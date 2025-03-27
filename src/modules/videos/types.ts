import { inferRouterOutputs } from "@trpc/server";

import {AppRouter} from "@/trpc/routers/_app"

export type VideoGetOneOutput =
    inferRouterOutputs<AppRouter>["videos"]["getOne"]; 
    /**
     * inferRouterOutputs<AppRouter>: Get all return types of AppRouter.
    ["videos"]["getOne"]:
    videos represents the videos route in AppRouter.
    getOne represents the getOne method under the videos route (used to get data for a single video) 
    */
// TODO: change to videos getMany
export type VideoGetManyOutput =
    inferRouterOutputs<AppRouter>["suggestions"]["getMany"]; 