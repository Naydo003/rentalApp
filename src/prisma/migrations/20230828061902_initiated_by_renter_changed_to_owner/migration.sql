/*
  Warnings:

  - You are about to drop the column `initiatedByRenter` on the `BookingModDetails` table. All the data in the column will be lost.
  - You are about to drop the column `escortNote` on the `CancellationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `initiatedByRenter` on the `CancellationDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BookingModDetails` DROP COLUMN `initiatedByRenter`,
    ADD COLUMN `initiatedByOwner` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CancellationDetails` DROP COLUMN `escortNote`,
    DROP COLUMN `initiatedByRenter`,
    ADD COLUMN `initiatedByOwner` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ownerNote` VARCHAR(191) NULL;
