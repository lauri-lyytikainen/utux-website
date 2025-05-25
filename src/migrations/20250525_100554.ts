import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "file" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_button" boolean DEFAULT true,
  	"use_internal_link" boolean DEFAULT true,
  	"button_link_id" integer,
  	"button_link_external" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_carousel_slides_locales" (
  	"title" varchar DEFAULT 'Carousel',
  	"description" jsonb,
  	"footer" jsonb,
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_file_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"full_width" boolean DEFAULT false,
  	"file_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_file_button_locales" (
  	"button_text" varchar DEFAULT 'Download File',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_image_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_button" boolean DEFAULT true,
  	"use_internal_link" boolean DEFAULT true,
  	"button_link_id" integer,
  	"button_link_external" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_locales" (
  	"title" varchar DEFAULT 'Carousel',
  	"description" jsonb,
  	"footer" jsonb,
  	"button_text" varchar DEFAULT 'Learn More',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_image_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_file_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_width" boolean DEFAULT false,
  	"file_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_file_button_locales" (
  	"button_text" varchar DEFAULT 'Download File',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "show_button" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "pages_blocks_profile_card_locales" ADD COLUMN "button_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "show_button" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_profile_card_locales" ADD COLUMN "button_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "file_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_carousel_slides" ADD CONSTRAINT "pages_blocks_image_carousel_slides_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_carousel_slides" ADD CONSTRAINT "pages_blocks_image_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_carousel_slides" ADD CONSTRAINT "pages_blocks_image_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_carousel_slides_locales" ADD CONSTRAINT "pages_blocks_image_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_carousel" ADD CONSTRAINT "pages_blocks_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_file_button" ADD CONSTRAINT "pages_blocks_file_button_file_id_file_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_file_button" ADD CONSTRAINT "pages_blocks_file_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_file_button_locales" ADD CONSTRAINT "pages_blocks_file_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_file_button"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_image_carousel_slides_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_image_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_image_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_carousel_slides_locales" ADD CONSTRAINT "_pages_v_blocks_image_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_carousel" ADD CONSTRAINT "_pages_v_blocks_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_file_button" ADD CONSTRAINT "_pages_v_blocks_file_button_file_id_file_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_file_button" ADD CONSTRAINT "_pages_v_blocks_file_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_file_button_locales" ADD CONSTRAINT "_pages_v_blocks_file_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_file_button"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "file_updated_at_idx" ON "file" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "file_created_at_idx" ON "file" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "file_filename_idx" ON "file" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_slides_order_idx" ON "pages_blocks_image_carousel_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_slides_parent_id_idx" ON "pages_blocks_image_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_slides_button_link_idx" ON "pages_blocks_image_carousel_slides" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_slides_image_idx" ON "pages_blocks_image_carousel_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_image_carousel_slides_locales_locale_parent_id_unique" ON "pages_blocks_image_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_order_idx" ON "pages_blocks_image_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_parent_id_idx" ON "pages_blocks_image_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_path_idx" ON "pages_blocks_image_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_file_button_order_idx" ON "pages_blocks_file_button" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_file_button_parent_id_idx" ON "pages_blocks_file_button" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_file_button_path_idx" ON "pages_blocks_file_button" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_file_button_file_idx" ON "pages_blocks_file_button" USING btree ("file_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_file_button_locales_locale_parent_id_unique" ON "pages_blocks_file_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_order_idx" ON "_pages_v_blocks_image_carousel_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_parent_id_idx" ON "_pages_v_blocks_image_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_button_link_idx" ON "_pages_v_blocks_image_carousel_slides" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_image_idx" ON "_pages_v_blocks_image_carousel_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_locales_locale_parent_id_unique" ON "_pages_v_blocks_image_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_order_idx" ON "_pages_v_blocks_image_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_parent_id_idx" ON "_pages_v_blocks_image_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_path_idx" ON "_pages_v_blocks_image_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_file_button_order_idx" ON "_pages_v_blocks_file_button" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_file_button_parent_id_idx" ON "_pages_v_blocks_file_button" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_file_button_path_idx" ON "_pages_v_blocks_file_button" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_file_button_file_idx" ON "_pages_v_blocks_file_button" USING btree ("file_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_file_button_locales_locale_parent_id_unique" ON "_pages_v_blocks_file_button_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_profile_card" ADD CONSTRAINT "pages_blocks_profile_card_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_profile_card" ADD CONSTRAINT "_pages_v_blocks_profile_card_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_file_fk" FOREIGN KEY ("file_id") REFERENCES "public"."file"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_profile_card_button_link_idx" ON "pages_blocks_profile_card" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_button_link_idx" ON "_pages_v_blocks_profile_card" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_file_id_idx" ON "payload_locked_documents_rels" USING btree ("file_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "file" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_carousel_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_file_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_file_button_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_carousel_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_file_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_file_button_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "file" CASCADE;
  DROP TABLE "pages_blocks_image_carousel_slides" CASCADE;
  DROP TABLE "pages_blocks_image_carousel_slides_locales" CASCADE;
  DROP TABLE "pages_blocks_image_carousel" CASCADE;
  DROP TABLE "pages_blocks_file_button" CASCADE;
  DROP TABLE "pages_blocks_file_button_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_carousel_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_image_carousel_slides_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_file_button" CASCADE;
  DROP TABLE "_pages_v_blocks_file_button_locales" CASCADE;
  ALTER TABLE "pages_blocks_profile_card" DROP CONSTRAINT "pages_blocks_profile_card_button_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_profile_card" DROP CONSTRAINT "_pages_v_blocks_profile_card_button_link_id_pages_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_file_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_profile_card_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_profile_card_button_link_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_file_id_idx";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "show_button";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "pages_blocks_profile_card_locales" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "show_button";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_profile_card_locales" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "file_id";`)
}
