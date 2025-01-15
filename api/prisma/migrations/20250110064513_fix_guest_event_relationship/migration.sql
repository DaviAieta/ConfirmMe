/*
  Warnings:

  - You are about to drop the column `eventId` on the `Guests` table. All the data in the column will be lost.
  - You are about to alter the column `token` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[token]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Guests` DROP FOREIGN KEY `Guests_eventId_fkey`;

-- AlterTable
ALTER TABLE `Guests` DROP COLUMN `eventId`;

-- AlterTable
ALTER TABLE `Users` MODIFY `token` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_EventGuests` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventGuests_AB_unique`(`A`, `B`),
    INDEX `_EventGuests_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Users_token_key` ON `Users`(`token`);

-- AddForeignKey
ALTER TABLE `_EventGuests` ADD CONSTRAINT `_EventGuests_A_fkey` FOREIGN KEY (`A`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventGuests` ADD CONSTRAINT `_EventGuests_B_fkey` FOREIGN KEY (`B`) REFERENCES `Guests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
