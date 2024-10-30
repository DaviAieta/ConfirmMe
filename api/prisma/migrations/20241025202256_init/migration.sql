/*
  Warnings:

  - You are about to drop the column `grade` on the `people` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `people` table. All the data in the column will be lost.
  - You are about to drop the `movements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `movements` DROP FOREIGN KEY `Movements_eventsId_fkey`;

-- DropForeignKey
ALTER TABLE `movements` DROP FOREIGN KEY `Movements_peopleId_fkey`;

-- AlterTable
ALTER TABLE `people` DROP COLUMN `grade`,
    DROP COLUMN `sport`;

-- DropTable
DROP TABLE `movements`;
