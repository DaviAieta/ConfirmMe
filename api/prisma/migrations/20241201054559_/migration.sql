-- AlterTable
ALTER TABLE `events` ADD COLUMN `categoriesId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `color` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_categoriesId_fkey` FOREIGN KEY (`categoriesId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
