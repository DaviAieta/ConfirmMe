/*
  Warnings:

  - You are about to drop the column `cpf` on the `guests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `guests` DROP COLUMN `cpf`,
    ADD COLUMN `confirmed` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `declined` BOOLEAN NULL DEFAULT true;
