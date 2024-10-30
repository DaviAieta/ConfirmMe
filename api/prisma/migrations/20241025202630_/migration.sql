/*
  Warnings:

  - Added the required column `confirmed` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `declined` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pending` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `confirmed` INTEGER NOT NULL,
    ADD COLUMN `declined` INTEGER NOT NULL,
    ADD COLUMN `pending` INTEGER NOT NULL;
