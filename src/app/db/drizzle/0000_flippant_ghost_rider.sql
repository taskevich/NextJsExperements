CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(32) NOT NULL,
	"name" varchar(32) NOT NULL,
	CONSTRAINT "roles_role_unique" UNIQUE("role")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(64) NOT NULL,
	"password" text NOT NULL,
	"email" varchar(64),
	"role_id" integer NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
