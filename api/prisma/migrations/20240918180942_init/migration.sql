-- CreateTable
CREATE TABLE `People` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INTEGER NOT NULL,
    `admin` ENUM('Y', 'N') NOT NULL,
    `grade` ENUM('FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR') NOT NULL,
    `gender` ENUM('MEN', 'WOMEN') NOT NULL,
    `sport` ENUM('FOOTBALL', 'SOCCER', 'CHEERLEADER', 'GOLF', 'RUGBY', 'BASKETBALL', 'SWIMMING', 'TRACKFIELD', 'VOLLEYBALL') NOT NULL,
    `birth` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `peopleId` INTEGER NULL,
    `eventsId` INTEGER NULL,
    `dhConfirmation` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `dhStart` DATETIME(3) NOT NULL,
    `dhEnd` DATETIME(3) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `people_limit` INTEGER NOT NULL,
    `status` ENUM('ACTIVATE', 'DONE', 'CANCELED') NOT NULL,
    `image_path` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Movements` ADD CONSTRAINT `Movements_peopleId_fkey` FOREIGN KEY (`peopleId`) REFERENCES `People`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movements` ADD CONSTRAINT `Movements_eventsId_fkey` FOREIGN KEY (`eventsId`) REFERENCES `Events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
