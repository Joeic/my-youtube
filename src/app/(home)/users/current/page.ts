// /app/users/current/page.tsx
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId));

  if (!existingUser) {
    redirect("/sign-in");
  }

  redirect(`/users/${existingUser.id}`);
}
