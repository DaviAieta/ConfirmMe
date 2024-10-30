/*
  Warnings:

  - You are about to drop the column `image_path` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `people_limit` on the `events` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleLimit` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `image_path`,
    DROP COLUMN `people_limit`,
    ADD COLUMN `imagePath` VARCHAR(255) NOT NULL,
    ADD COLUMN `peopleLimit` INTEGER NOT NULL;
