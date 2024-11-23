/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Guests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Guests_phone_key` ON `Guests`(`phone`);
