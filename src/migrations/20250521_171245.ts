import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_form_locales" ADD COLUMN "name_field_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact_form_locales" ADD COLUMN "email_field_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact_form_locales" ADD COLUMN "message_field_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form_locales" ADD COLUMN "name_field_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form_locales" ADD COLUMN "email_field_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form_locales" ADD COLUMN "message_field_placeholder" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_form_locales" DROP COLUMN IF EXISTS "name_field_placeholder";
  ALTER TABLE "pages_blocks_contact_form_locales" DROP COLUMN IF EXISTS "email_field_placeholder";
  ALTER TABLE "pages_blocks_contact_form_locales" DROP COLUMN IF EXISTS "message_field_placeholder";
  ALTER TABLE "_pages_v_blocks_contact_form_locales" DROP COLUMN IF EXISTS "name_field_placeholder";
  ALTER TABLE "_pages_v_blocks_contact_form_locales" DROP COLUMN IF EXISTS "email_field_placeholder";
  ALTER TABLE "_pages_v_blocks_contact_form_locales" DROP COLUMN IF EXISTS "message_field_placeholder";`)
}
