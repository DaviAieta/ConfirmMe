/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Categories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Categories_uuid_key` ON `Categories`(`uuid`);
