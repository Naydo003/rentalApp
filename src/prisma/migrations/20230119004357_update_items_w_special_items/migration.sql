/*
  Warnings:

  - You are about to drop the column `SpecialItemModifyer` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `SpecialItemModifyer`,
    ADD COLUMN `bookAuthor` VARCHAR(191) NULL,
    ADD COLUMN `bookGenre` VARCHAR(191) NULL,
    ADD COLUMN `carMake` VARCHAR(191) NULL,
    ADD COLUMN `clothingLabel` VARCHAR(191) NULL,
    ADD COLUMN `specialItem` ENUM('Car', 'Clothing', 'Book', 'Property') NULL;
