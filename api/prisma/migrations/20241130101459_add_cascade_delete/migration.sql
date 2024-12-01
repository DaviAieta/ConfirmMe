-- DropForeignKey
ALTER TABLE `guests` DROP FOREIGN KEY `Guests_eventId_fkey`;

-- AddForeignKey
ALTER TABLE `Guests` ADD CONSTRAINT `Guests_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
