import { studioRouter } from '@/modules/studio/server/procedures';
import { createTRPCRouter, protectedProcedure } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedures';


export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  studio: studioRouter,
});
 
// export type definition of API
export type AppRouter = typeof appRouter;