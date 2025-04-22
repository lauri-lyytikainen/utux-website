import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_profile_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'John Doe',
  	"picture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_profile_card_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_profile_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'John Doe',
  	"picture_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_profile_card_locales" (
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_locales" (
  	"slogan" varchar DEFAULT 'New Slogan' NOT NULL,
  	"copyright_text" varchar DEFAULT '© 2025 Utux.fi' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_profile_card" ADD CONSTRAINT "pages_blocks_profile_card_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_profile_card" ADD CONSTRAINT "pages_blocks_profile_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_profile_card_locales" ADD CONSTRAINT "pages_blocks_profile_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_profile_card"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_profile_card" ADD CONSTRAINT "_pages_v_blocks_profile_card_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_profile_card" ADD CONSTRAINT "_pages_v_blocks_profile_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_profile_card_locales" ADD CONSTRAINT "_pages_v_blocks_profile_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_profile_card"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_profile_card_order_idx" ON "pages_blocks_profile_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_profile_card_parent_id_idx" ON "pages_blocks_profile_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_profile_card_path_idx" ON "pages_blocks_profile_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_profile_card_picture_idx" ON "pages_blocks_profile_card" USING btree ("picture_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_profile_card_locales_locale_parent_id_unique" ON "pages_blocks_profile_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_order_idx" ON "_pages_v_blocks_profile_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_parent_id_idx" ON "_pages_v_blocks_profile_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_path_idx" ON "_pages_v_blocks_profile_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_picture_idx" ON "_pages_v_blocks_profile_card" USING btree ("picture_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_locales_locale_parent_id_unique" ON "_pages_v_blocks_profile_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_profile_card" CASCADE;
  DROP TABLE "pages_blocks_profile_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_profile_card" CASCADE;
  DROP TABLE "_pages_v_blocks_profile_card_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;`)
}
