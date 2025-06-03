import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "site_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Link' NOT NULL,
  	"use_external_link" boolean DEFAULT false,
  	"page_id" integer,
  	"block_anchor_name" varchar,
  	"external_link" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_super_hero" DROP CONSTRAINT "pages_blocks_super_hero_button_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_super_hero" DROP CONSTRAINT "_pages_v_blocks_super_hero_button_link_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_super_hero_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_super_hero_button_link_idx";
  ALTER TABLE "pages_blocks_super_hero" ADD COLUMN "link_id" integer;
  ALTER TABLE "_pages_v_blocks_super_hero" ADD COLUMN "link_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "site_links_id" integer;
  DO $$ BEGIN
   ALTER TABLE "site_links" ADD CONSTRAINT "site_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "site_links_page_idx" ON "site_links" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "site_links_updated_at_idx" ON "site_links" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "site_links_created_at_idx" ON "site_links" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_super_hero" ADD CONSTRAINT "pages_blocks_super_hero_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_super_hero" ADD CONSTRAINT "_pages_v_blocks_super_hero_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_links_fk" FOREIGN KEY ("site_links_id") REFERENCES "public"."site_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_super_hero_link_idx" ON "pages_blocks_super_hero" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_super_hero_link_idx" ON "_pages_v_blocks_super_hero" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_site_links_id_idx" ON "payload_locked_documents_rels" USING btree ("site_links_id");
  ALTER TABLE "pages_blocks_super_hero" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_super_hero" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "pages_blocks_super_hero" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_super_hero" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_super_hero" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "_pages_v_blocks_super_hero" DROP COLUMN IF EXISTS "button_link_external";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_links" CASCADE;
  ALTER TABLE "pages_blocks_super_hero" DROP CONSTRAINT "pages_blocks_super_hero_link_id_site_links_id_fk";
  
  ALTER TABLE "_pages_v_blocks_super_hero" DROP CONSTRAINT "_pages_v_blocks_super_hero_link_id_site_links_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_site_links_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_super_hero_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_super_hero_link_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_site_links_id_idx";
  ALTER TABLE "pages_blocks_super_hero" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_super_hero" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "pages_blocks_super_hero" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_super_hero" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_super_hero" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "_pages_v_blocks_super_hero" ADD COLUMN "button_link_external" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_super_hero" ADD CONSTRAINT "pages_blocks_super_hero_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_super_hero" ADD CONSTRAINT "_pages_v_blocks_super_hero_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_super_hero_button_link_idx" ON "pages_blocks_super_hero" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_super_hero_button_link_idx" ON "_pages_v_blocks_super_hero" USING btree ("button_link_id");
  ALTER TABLE "pages_blocks_super_hero" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "_pages_v_blocks_super_hero" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "site_links_id";`)
}
