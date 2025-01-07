/*
  Warnings:

  - A unique constraint covering the columns `[email,eventId]` on the table `Guests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Guests_email_eventId_key` ON `Guests`(`email`, `eventId`);
