import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, firstName?: string, lastName?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        firstName,
        lastName,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Failed to sync user:", error);
    throw new Error("Failed to sync user profile", { cause: error });
  }
}
