import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_call_to_action" DROP CONSTRAINT "pages_blocks_call_to_action_button_link_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_link_button" DROP CONSTRAINT "pages_blocks_link_button_button_link_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_profile_card" DROP CONSTRAINT "pages_blocks_profile_card_button_link_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_image_carousel_slides" DROP CONSTRAINT "pages_blocks_image_carousel_slides_button_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP CONSTRAINT "_pages_v_blocks_call_to_action_button_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_link_button" DROP CONSTRAINT "_pages_v_blocks_link_button_button_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_profile_card" DROP CONSTRAINT "_pages_v_blocks_profile_card_button_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" DROP CONSTRAINT "_pages_v_blocks_image_carousel_slides_button_link_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_call_to_action_button_link_idx";
  DROP INDEX IF EXISTS "pages_blocks_link_button_button_link_idx";
  DROP INDEX IF EXISTS "pages_blocks_profile_card_button_link_idx";
  DROP INDEX IF EXISTS "pages_blocks_image_carousel_slides_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_call_to_action_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_link_button_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_profile_card_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_image_carousel_slides_button_link_idx";
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "link_id" integer;
  ALTER TABLE "pages_blocks_link_button" ADD COLUMN "link_id" integer;
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "link_id" integer;
  ALTER TABLE "pages_blocks_image_carousel_slides" ADD COLUMN "link_id" integer;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "link_id" integer;
  ALTER TABLE "_pages_v_blocks_link_button" ADD COLUMN "link_id" integer;
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "link_id" integer;
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD COLUMN "link_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_link_button" ADD CONSTRAINT "pages_blocks_link_button_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_profile_card" ADD CONSTRAINT "pages_blocks_profile_card_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_carousel_slides" ADD CONSTRAINT "pages_blocks_image_carousel_slides_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_link_button" ADD CONSTRAINT "_pages_v_blocks_link_button_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_profile_card" ADD CONSTRAINT "_pages_v_blocks_profile_card_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_image_carousel_slides_link_id_site_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."site_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_link_idx" ON "pages_blocks_call_to_action" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_button_link_idx" ON "pages_blocks_link_button" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_profile_card_link_idx" ON "pages_blocks_profile_card" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_slides_link_idx" ON "pages_blocks_image_carousel_slides" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_link_idx" ON "_pages_v_blocks_call_to_action" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_button_link_idx" ON "_pages_v_blocks_link_button" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_link_idx" ON "_pages_v_blocks_profile_card" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_link_idx" ON "_pages_v_blocks_image_carousel_slides" USING btree ("link_id");
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "pages_blocks_link_button" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_link_button" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "pages_blocks_link_button" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "pages_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "pages_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "pages_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_link_button" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_link_button" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "_pages_v_blocks_link_button" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "button_link_external";
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "use_internal_link";
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "button_link_id";
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "button_link_external";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_call_to_action" DROP CONSTRAINT "pages_blocks_call_to_action_link_id_site_links_id_fk";
  
  ALTER TABLE "pages_blocks_link_button" DROP CONSTRAINT "pages_blocks_link_button_link_id_site_links_id_fk";
  
  ALTER TABLE "pages_blocks_profile_card" DROP CONSTRAINT "pages_blocks_profile_card_link_id_site_links_id_fk";
  
  ALTER TABLE "pages_blocks_image_carousel_slides" DROP CONSTRAINT "pages_blocks_image_carousel_slides_link_id_site_links_id_fk";
  
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP CONSTRAINT "_pages_v_blocks_call_to_action_link_id_site_links_id_fk";
  
  ALTER TABLE "_pages_v_blocks_link_button" DROP CONSTRAINT "_pages_v_blocks_link_button_link_id_site_links_id_fk";
  
  ALTER TABLE "_pages_v_blocks_profile_card" DROP CONSTRAINT "_pages_v_blocks_profile_card_link_id_site_links_id_fk";
  
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" DROP CONSTRAINT "_pages_v_blocks_image_carousel_slides_link_id_site_links_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_call_to_action_link_idx";
  DROP INDEX IF EXISTS "pages_blocks_link_button_link_idx";
  DROP INDEX IF EXISTS "pages_blocks_profile_card_link_idx";
  DROP INDEX IF EXISTS "pages_blocks_image_carousel_slides_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_call_to_action_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_link_button_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_profile_card_link_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_image_carousel_slides_link_idx";
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "pages_blocks_link_button" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_link_button" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "pages_blocks_link_button" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "pages_blocks_profile_card" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "pages_blocks_image_carousel_slides" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_image_carousel_slides" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "pages_blocks_image_carousel_slides" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_link_button" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_link_button" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "_pages_v_blocks_link_button" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "_pages_v_blocks_profile_card" ADD COLUMN "button_link_external" varchar;
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD COLUMN "use_internal_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD COLUMN "button_link_id" integer;
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD COLUMN "button_link_external" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_link_button" ADD CONSTRAINT "pages_blocks_link_button_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_profile_card" ADD CONSTRAINT "pages_blocks_profile_card_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_carousel_slides" ADD CONSTRAINT "pages_blocks_image_carousel_slides_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_link_button" ADD CONSTRAINT "_pages_v_blocks_link_button_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_profile_card" ADD CONSTRAINT "_pages_v_blocks_profile_card_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_image_carousel_slides_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_button_link_idx" ON "pages_blocks_call_to_action" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_button_button_link_idx" ON "pages_blocks_link_button" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_profile_card_button_link_idx" ON "pages_blocks_profile_card" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_carousel_slides_button_link_idx" ON "pages_blocks_image_carousel_slides" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_button_link_idx" ON "_pages_v_blocks_call_to_action" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_button_button_link_idx" ON "_pages_v_blocks_link_button" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_profile_card_button_link_idx" ON "_pages_v_blocks_profile_card" USING btree ("button_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_carousel_slides_button_link_idx" ON "_pages_v_blocks_image_carousel_slides" USING btree ("button_link_id");
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "pages_blocks_link_button" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "pages_blocks_profile_card" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "pages_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "_pages_v_blocks_link_button" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "_pages_v_blocks_profile_card" DROP COLUMN IF EXISTS "link_id";
  ALTER TABLE "_pages_v_blocks_image_carousel_slides" DROP COLUMN IF EXISTS "link_id";`)
}
