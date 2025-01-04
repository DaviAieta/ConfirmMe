/*
  Warnings:

  - Made the column `categoriesId` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `Events_categoriesId_fkey`;

-- AlterTable
ALTER TABLE `events` MODIFY `categoriesId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_categoriesId_fkey` FOREIGN KEY (`categoriesId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
