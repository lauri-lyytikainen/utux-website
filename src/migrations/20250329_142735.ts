import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_cookie_preferences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cookie_preferences_locales" (
  	"button_text" varchar DEFAULT 'Manage your cookie preferences',
  	"consent_text" varchar DEFAULT 'Consented',
  	"decline_text" varchar DEFAULT 'Declined',
  	"essential_title" varchar DEFAULT 'Essential',
  	"essential_description" varchar DEFAULT 'Required for the website to function properly',
  	"analytics_title" varchar DEFAULT 'Analytics',
  	"analytics_description" varchar DEFAULT 'Help us understand how visitors interact with our website',
  	"social_title" varchar DEFAULT 'Social',
  	"social_description" varchar DEFAULT 'Enable social media features and sharing',
  	"advertising_title" varchar DEFAULT 'Advertising',
  	"advertising_description" varchar DEFAULT 'Personalize advertisements and measure their performance',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cookie_preferences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cookie_preferences_locales" (
  	"button_text" varchar DEFAULT 'Manage your cookie preferences',
  	"consent_text" varchar DEFAULT 'Consented',
  	"decline_text" varchar DEFAULT 'Declined',
  	"essential_title" varchar DEFAULT 'Essential',
  	"essential_description" varchar DEFAULT 'Required for the website to function properly',
  	"analytics_title" varchar DEFAULT 'Analytics',
  	"analytics_description" varchar DEFAULT 'Help us understand how visitors interact with our website',
  	"social_title" varchar DEFAULT 'Social',
  	"social_description" varchar DEFAULT 'Enable social media features and sharing',
  	"advertising_title" varchar DEFAULT 'Advertising',
  	"advertising_description" varchar DEFAULT 'Personalize advertisements and measure their performance',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cookie_preferences" ADD CONSTRAINT "pages_blocks_cookie_preferences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD CONSTRAINT "pages_blocks_cookie_preferences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cookie_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cookie_preferences" ADD CONSTRAINT "_pages_v_blocks_cookie_preferences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD CONSTRAINT "_pages_v_blocks_cookie_preferences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cookie_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_cookie_preferences_order_idx" ON "pages_blocks_cookie_preferences" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cookie_preferences_parent_id_idx" ON "pages_blocks_cookie_preferences" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cookie_preferences_path_idx" ON "pages_blocks_cookie_preferences" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cookie_preferences_locales_locale_parent_id_unique" ON "pages_blocks_cookie_preferences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cookie_preferences_order_idx" ON "_pages_v_blocks_cookie_preferences" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cookie_preferences_parent_id_idx" ON "_pages_v_blocks_cookie_preferences" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cookie_preferences_path_idx" ON "_pages_v_blocks_cookie_preferences" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cookie_preferences_locales_locale_parent_id_unique" ON "_pages_v_blocks_cookie_preferences_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cookie_preferences" CASCADE;
  DROP TABLE "pages_blocks_cookie_preferences_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cookie_preferences" CASCADE;
  DROP TABLE "_pages_v_blocks_cookie_preferences_locales" CASCADE;`)
}
