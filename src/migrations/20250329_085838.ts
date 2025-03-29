import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_page_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_link_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"full_width" boolean DEFAULT false,
  	"use_internal_link" boolean DEFAULT true,
  	"button_link_id" integer,
  	"button_link_external" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_link_button_locales" (
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_link_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_width" boolean DEFAULT false,
  	"use_internal_link" boolean DEFAULT true,
  	"button_link_id" integer,
  	"button_link_external" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_link_button_locales" (
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP INDEX IF EXISTS "media_sizes_medium_sizes_medium_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx";
  ALTER TABLE "media" ADD COLUMN "sizes_wide_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_wide_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_wide_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_wide_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_wide_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_wide_filename" varchar;
  ALTER TABLE "pages_blocks_call_to_action_locales" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" ADD COLUMN "description" jsonb;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_media" ADD CONSTRAINT "pages_blocks_page_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_media" ADD CONSTRAINT "pages_blocks_page_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_link_button" ADD CONSTRAINT "pages_blocks_link_button_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_link_button" ADD CONSTRAINT "pages_blocks_link_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_link_button_locales" ADD CONSTRAINT "pages_blocks_link_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_link_button"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_media" ADD CONSTRAINT "_pages_v_blocks_page_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_media" ADD CONSTRAINT "_pages_v_blocks_page_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_link_button" ADD CONSTRAINT "_pages_v_blocks_link_button_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_link_button" ADD CONSTRAINT "_pages_v_blocks_link_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_link_button_locales" ADD CONSTRAINT "_pages_v_blocks_link_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_link_button"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_media_order_idx" ON "pages_blocks_page_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_media_parent_id_idx" ON "pages_blocks_page_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_media_path_idx" ON "pages_blocks_page_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_media_media_idx" ON "pages_blocks_page_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_button_order_idx" ON "pages_blocks_link_button" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_button_parent_id_idx" ON "pages_blocks_link_button" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_button_path_idx" ON "pages_blocks_link_button" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_button_button_link_idx" ON "pages_blocks_link_button" USING btree ("button_link_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_link_button_locales_locale_parent_id_unique" ON "pages_blocks_link_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_media_order_idx" ON "_pages_v_blocks_page_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_media_parent_id_idx" ON "_pages_v_blocks_page_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_media_path_idx" ON "_pages_v_blocks_page_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_media_media_idx" ON "_pages_v_blocks_page_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_button_order_idx" ON "_pages_v_blocks_link_button" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_button_parent_id_idx" ON "_pages_v_blocks_link_button" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_button_path_idx" ON "_pages_v_blocks_link_button" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_button_button_link_idx" ON "_pages_v_blocks_link_button" USING btree ("button_link_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_link_button_locales_locale_parent_id_unique" ON "_pages_v_blocks_link_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "media_sizes_wide_sizes_wide_filename_idx" ON "media" USING btree ("sizes_wide_filename");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_xlarge_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_xlarge_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_xlarge_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_xlarge_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_xlarge_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_xlarge_filename";
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_page_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_button_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_button_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_page_media" CASCADE;
  DROP TABLE "pages_blocks_link_button" CASCADE;
  DROP TABLE "pages_blocks_link_button_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_media" CASCADE;
  DROP TABLE "_pages_v_blocks_link_button" CASCADE;
  DROP TABLE "_pages_v_blocks_link_button_locales" CASCADE;
  DROP INDEX IF EXISTS "media_sizes_wide_sizes_wide_filename_idx";
  ALTER TABLE "media" ADD COLUMN "sizes_medium_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_filename" varchar;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "description" jsonb;
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_wide_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_wide_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_wide_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_wide_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_wide_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_wide_filename";
  ALTER TABLE "pages_blocks_call_to_action_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" DROP COLUMN IF EXISTS "description";`)
}
