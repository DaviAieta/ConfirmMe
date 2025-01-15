/*
  Warnings:

  - You are about to drop the column `confirmed` on the `Guests` table. All the data in the column will be lost.
  - You are about to drop the column `declined` on the `Guests` table. All the data in the column will be lost.
  - You are about to drop the `_EventGuests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_EventGuests` DROP FOREIGN KEY `_EventGuests_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EventGuests` DROP FOREIGN KEY `_EventGuests_B_fkey`;

-- AlterTable
ALTER TABLE `Guests` DROP COLUMN `confirmed`,
    DROP COLUMN `declined`;

-- DropTable
DROP TABLE `_EventGuests`;

-- CreateTable
CREATE TABLE `EventGuest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `guestId` INTEGER NOT NULL,
    `confirmed` BOOLEAN NOT NULL DEFAULT false,
    `declined` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `EventGuest_eventId_guestId_key`(`eventId`, `guestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventGuest` ADD CONSTRAINT `EventGuest_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventGuest` ADD CONSTRAINT `EventGuest_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Guests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
