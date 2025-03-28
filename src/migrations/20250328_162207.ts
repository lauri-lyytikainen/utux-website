import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_action_locales" (
  	"title" varchar DEFAULT 'Call to Action',
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_action_locales" (
  	"title" varchar DEFAULT 'Call to Action',
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_call_to_action" RENAME COLUMN "link_id" TO "button_link_id";
  ALTER TABLE "_pages_v_blocks_call_to_action" RENAME COLUMN "link_id" TO "button_link_id";
  ALTER TABLE "pages_blocks_call_to_action" DROP CONSTRAINT "pages_blocks_call_to_action_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP CONSTRAINT "_pages_v_blocks_call_to_action_link_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_call_to_action_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_call_to_action_link_idx";
  ALTER TABLE "pages_blocks_simple_hero_locales" ALTER COLUMN "title" SET DEFAULT 'Hero title';
  ALTER TABLE "pages_blocks_super_hero_locales" ALTER COLUMN "title" SET DEFAULT 'Hero title';
  ALTER TABLE "_pages_v_blocks_simple_hero_locales" ALTER COLUMN "title" SET DEFAULT 'Hero title';
  ALTER TABLE "_pages_v_blocks_super_hero_locales" ALTER COLUMN "title" SET DEFAULT 'Hero title';
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "pages_blocks_super_hero" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_super_hero" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_super_hero" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_super_hero" ADD COLUMN "button_link_external" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_locales" ADD CONSTRAINT "pages_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_text_locales" ADD CONSTRAINT "pages_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_text_locales" ADD CONSTRAINT "_pages_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_call_to_action_locales_locale_parent_id_unique" ON "pages_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_text_locales_locale_parent_id_unique" ON "pages_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_locales_locale_parent_id_unique" ON "_pages_v_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_button_link_idx" ON "pages_blocks_call_to_action" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_button_link_idx" ON "_pages_v_blocks_call_to_action" USING btree ("button_link_id");
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_text" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "_pages_v_blocks_text" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "pages_blocks_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_text_locales" CASCADE;
  ALTER TABLE "pages_blocks_call_to_action" RENAME COLUMN "button_link_id" TO "link_id";
  ALTER TABLE "_pages_v_blocks_call_to_action" RENAME COLUMN "button_link_id" TO "link_id";
  ALTER TABLE "pages_blocks_call_to_action" DROP CONSTRAINT "pages_blocks_call_to_action_button_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP CONSTRAINT "_pages_v_blocks_call_to_action_button_link_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_call_to_action_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_call_to_action_button_link_idx";
  ALTER TABLE "pages_blocks_simple_hero_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "pages_blocks_super_hero_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_simple_hero_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_super_hero_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "title" varchar DEFAULT 'Call to Action';
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "link_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "pages_blocks_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "title" varchar DEFAULT 'Call to Action';
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "link_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "_pages_v_blocks_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_content" jsonb;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_link_idx" ON "pages_blocks_call_to_action" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_link_idx" ON "_pages_v_blocks_call_to_action" USING btree ("link_id");
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "pages_blocks_super_hero" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_super_hero" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_super_hero" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_super_hero" DROP COLUMN IF EXISTS "button_link_external";`)
}
