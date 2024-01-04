import { integer, bigint, serial, pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const roles = pgTable(
    "roles",
    {
        id: serial("id").primaryKey(),
        role: varchar("role", { length: 32 }).unique().notNull(),
        name: varchar("name", { length: 32 }).notNull(),
    }
)

export const users = pgTable(
    "users",
    {
        id: serial("id").primaryKey(),
        username: varchar("username", {length: 64}).notNull().unique(),
        password: text("password").notNull(),
        email: varchar("email", {length: 64}),
        roleId: integer("role_id").references(() => roles.id).notNull()
    }
)