import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "cookie_translation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"popup_privacy_policy_link_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "cookie_translation_locales" (
  	"popup_title" varchar DEFAULT 'Cookie Preferences' NOT NULL,
  	"popup_message" varchar DEFAULT 'This website uses cookies to enhance your experience' NOT NULL,
  	"popup_button_text" varchar DEFAULT 'Accept' NOT NULL,
  	"popup_decline_button_text" varchar DEFAULT 'Decline' NOT NULL,
  	"popup_manage_button_text" varchar DEFAULT 'Manage Cookies' NOT NULL,
  	"popup_privacy_policy_text" varchar DEFAULT 'Privacy Policy' NOT NULL,
  	"manage_consent_modal_manage_title" varchar DEFAULT 'Manage Cookie Preferences' NOT NULL,
  	"manage_consent_modal_manage_message" varchar DEFAULT 'Manage your cookie preferences below. Essential cookies are always enabled as they are necessary for the website to function properly.' NOT NULL,
  	"manage_consent_modal_manage_cookies_status" varchar DEFAULT 'Status: {{status}} on {{date}}' NOT NULL,
  	"manage_consent_modal_manage_cookies_status_consented" varchar DEFAULT 'Consented' NOT NULL,
  	"manage_consent_modal_manage_cookies_status_declined" varchar DEFAULT 'Declined' NOT NULL,
  	"manage_consent_modal_manage_cancel_button_text" varchar DEFAULT 'Cancel' NOT NULL,
  	"manage_consent_modal_manage_save_button_text" varchar DEFAULT 'Save Preferences' NOT NULL,
  	"sections_essential_manage_essential_title" varchar DEFAULT 'Essential' NOT NULL,
  	"sections_essential_manage_essential_subtitle" varchar DEFAULT 'Required for the website to function properly' NOT NULL,
  	"sections_essential_manage_essential_status" varchar DEFAULT 'Status: Always enabled' NOT NULL,
  	"sections_essential_manage_essential_status_button_text" varchar DEFAULT 'Always On' NOT NULL,
  	"sections_analytics_manage_analytics_title" varchar DEFAULT 'Analytics' NOT NULL,
  	"sections_analytics_manage_analytics_subtitle" varchar DEFAULT 'Help us understand how visitors interact with our website' NOT NULL,
  	"sections_social_manage_social_title" varchar DEFAULT 'Social' NOT NULL,
  	"sections_social_manage_social_subtitle" varchar DEFAULT 'Enable social media features and sharing' NOT NULL,
  	"sections_advertising_manage_advert_title" varchar DEFAULT 'Advertising' NOT NULL,
  	"sections_advertising_manage_advert_subtitle" varchar DEFAULT 'Personalize advertisements and measure their performance' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "locale" varchar;
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "locale" varchar;
  DO $$ BEGIN
   ALTER TABLE "cookie_translation" ADD CONSTRAINT "cookie_translation_popup_privacy_policy_link_id_pages_id_fk" FOREIGN KEY ("popup_privacy_policy_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cookie_translation_locales" ADD CONSTRAINT "cookie_translation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_translation"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cookie_translation_popup_popup_privacy_policy_link_idx" ON "cookie_translation" USING btree ("popup_privacy_policy_link_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cookie_translation_locales_locale_parent_id_unique" ON "cookie_translation_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "consent_text";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "decline_text";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "essential_title";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "essential_description";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "analytics_title";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "analytics_description";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "social_title";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "social_description";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "advertising_title";
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "advertising_description";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "consent_text";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "decline_text";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "essential_title";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "essential_description";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "analytics_title";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "analytics_description";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "social_title";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "social_description";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "advertising_title";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "advertising_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cookie_translation" CASCADE;
  DROP TABLE "cookie_translation_locales" CASCADE;
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "button_text" varchar DEFAULT 'Manage your cookie preferences';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "consent_text" varchar DEFAULT 'Consented';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "decline_text" varchar DEFAULT 'Declined';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "essential_title" varchar DEFAULT 'Essential';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "essential_description" varchar DEFAULT 'Required for the website to function properly';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "analytics_title" varchar DEFAULT 'Analytics';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "analytics_description" varchar DEFAULT 'Help us understand how visitors interact with our website';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "social_title" varchar DEFAULT 'Social';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "social_description" varchar DEFAULT 'Enable social media features and sharing';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "advertising_title" varchar DEFAULT 'Advertising';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" ADD COLUMN "advertising_description" varchar DEFAULT 'Personalize advertisements and measure their performance';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "button_text" varchar DEFAULT 'Manage your cookie preferences';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "consent_text" varchar DEFAULT 'Consented';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "decline_text" varchar DEFAULT 'Declined';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "essential_title" varchar DEFAULT 'Essential';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "essential_description" varchar DEFAULT 'Required for the website to function properly';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "analytics_title" varchar DEFAULT 'Analytics';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "analytics_description" varchar DEFAULT 'Help us understand how visitors interact with our website';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "social_title" varchar DEFAULT 'Social';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "social_description" varchar DEFAULT 'Enable social media features and sharing';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "advertising_title" varchar DEFAULT 'Advertising';
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" ADD COLUMN "advertising_description" varchar DEFAULT 'Personalize advertisements and measure their performance';
  ALTER TABLE "pages_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "locale";
  ALTER TABLE "_pages_v_blocks_cookie_preferences_locales" DROP COLUMN IF EXISTS "locale";`)
}
