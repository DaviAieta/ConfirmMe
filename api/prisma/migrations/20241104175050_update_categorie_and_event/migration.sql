/*
  Warnings:

  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `pending` on the `events` table. All the data in the column will be lost.
  - Added the required column `title` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `pending`;
