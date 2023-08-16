-- AlterTable
ALTER TABLE `Item` ADD COLUMN `locationCoordinates` VARCHAR(191) NULL,
    ADD COLUMN `odometer` MEDIUMINT NULL,
    ADD COLUMN `yearOfManufacture` SMALLINT NULL;
