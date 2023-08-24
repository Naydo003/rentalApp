/*
  Warnings:

  - You are about to drop the column `cancelledOnDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `modPickUpTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `modRequest` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `modReturnTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `statusAccepted` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `statusCancelled` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `statusDeclined` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `cancelledOnDate`,
    DROP COLUMN `modPickUpTime`,
    DROP COLUMN `modRequest`,
    DROP COLUMN `modReturnTime`,
    DROP COLUMN `statusAccepted`,
    DROP COLUMN `statusCancelled`,
    DROP COLUMN `statusDeclined`,
    ADD COLUMN `confirmedAndDepositOnDate` DATETIME(3) NULL,
    ADD COLUMN `retractedOnDate` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('requested', 'accepted', 'declined', 'retracted', 'confirmed', 'modRequestedByUser', 'modRequestOrCancelByUser', 'cancelledByUser', 'modRequestedByEscort', 'modRequestOrCancelByEscort', 'cancelledByEscort', 'inProgress', 'completed', 'closed') NOT NULL DEFAULT 'requested';

-- CreateTable
CREATE TABLE `BookingModDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `initiatedByRenter` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `itemAgreedRate` DECIMAL(7, 2) NULL,
    `agreedDeposit` DECIMAL(7, 2) NULL,
    `expectedTransactionCost` DECIMAL(7, 2) NULL,
    `pickUpTime` DATETIME(3) NULL,
    `returnTime` DATETIME(3) NULL,
    `renterNote` VARCHAR(191) NULL,
    `renteeNote` VARCHAR(191) NULL,
    `cancelIfReject` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('requested', 'retracted', 'rejected', 'approved') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CancellationDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `initiatedByRenter` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `escortNote` VARCHAR(191) NULL,
    `userNote` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookingModDetails` ADD CONSTRAINT `BookingModDetails_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CancellationDetails` ADD CONSTRAINT `CancellationDetails_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
