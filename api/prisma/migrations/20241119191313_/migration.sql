-- AlterTable
ALTER TABLE `guests` MODIFY `confirmed` BOOLEAN NULL DEFAULT false,
    MODIFY `declined` BOOLEAN NULL DEFAULT false;
