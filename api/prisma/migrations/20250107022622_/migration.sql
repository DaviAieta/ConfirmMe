/*
  Warnings:

  - Added the required column `type` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Events` ADD COLUMN `type` ENUM('ONLINE', 'INPERSON') NOT NULL;
