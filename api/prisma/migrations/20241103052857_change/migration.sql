/*
  Warnings:

  - You are about to drop the column `imagePath` on the `events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Events` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Events` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `imagePath`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    MODIFY `confirmed` INTEGER NOT NULL DEFAULT 0,
    MODIFY `declined` INTEGER NOT NULL DEFAULT 0,
    MODIFY `pending` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Events_uuid_key` ON `Events`(`uuid`);
