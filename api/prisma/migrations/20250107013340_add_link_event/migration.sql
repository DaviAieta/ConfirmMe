/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Events` DROP COLUMN `imagePath`,
    ADD COLUMN `image` VARCHAR(255) NULL,
    ADD COLUMN `link` VARCHAR(255) NULL,
    MODIFY `address` VARCHAR(255) NULL;
