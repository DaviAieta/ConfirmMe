-- AlterTable
ALTER TABLE `Categories` ADD COLUMN `usersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
