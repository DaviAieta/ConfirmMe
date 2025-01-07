/*
  Warnings:

  - You are about to drop the column `image` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Events` DROP COLUMN `image`,
    ADD COLUMN `imagePath` VARCHAR(255) NULL;
