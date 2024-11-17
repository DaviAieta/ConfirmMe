/*
  Warnings:

  - You are about to drop the column `image_path` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `image_path`,
    ADD COLUMN `imagePath` VARCHAR(255) NULL;
