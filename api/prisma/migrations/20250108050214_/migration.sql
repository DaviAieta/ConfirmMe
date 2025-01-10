/*
  Warnings:

  - You are about to drop the column `admin` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `birth` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Users` table. All the data in the column will be lost.
  - Added the required column `token` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Events` ADD COLUMN `usersId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `admin`,
    DROP COLUMN `birth`,
    DROP COLUMN `gender`,
    DROP COLUMN `phone`,
    ADD COLUMN `token` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
