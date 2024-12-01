/*
  Warnings:

  - You are about to drop the column `categoryId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `Events_categoryId_fkey`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `categoryId`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `people`;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INTEGER NOT NULL,
    `admin` ENUM('Y', 'N') NOT NULL,
    `gender` ENUM('MEN', 'WOMEN') NOT NULL,
    `birth` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
