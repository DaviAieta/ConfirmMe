/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Guests` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Guests_email_eventId_key` ON `Guests`;

-- CreateIndex
CREATE UNIQUE INDEX `Guests_email_key` ON `Guests`(`email`);
