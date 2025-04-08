import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "show_button" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "show_button" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "show_button";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "show_button";`)
}
