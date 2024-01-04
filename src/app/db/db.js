import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { users } from './models';
import { eq, or } from 'drizzle-orm';

// const migrationClient = postgres("postgresql://postgres:postgres@0.0.0.0:5432/nextjsstudy", { max: 1 });
// migrate(drizzle(migrationClient), { migrationsFolder: "./src/app/db/drizzle" })

const queryClient = postgres("postgresql://postgres:postgres@0.0.0.0:5432/nextjsstudy");
export const db = drizzle(queryClient);

export async function createUser(username, email, password, roleId = 2) {
    return await db.insert(users).values({ username, email, password, roleId })
}

export async function getUser(data) {
    return await db.select().from(users).where(
        or(
            eq(users.username, data),
            eq(users.email, data)
        )
    ).limit(1)
}