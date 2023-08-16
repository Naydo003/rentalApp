/*
  Warnings:

  - You are about to drop the column `itemAgreedLateCancelationPolicy` on the `Booking` table. All the data in the column will be lost.
  - The values [freeCancellation,percentOfcontract10after24hours,percentOfcontract25after24hours,percentOfcontract50after24hours,percentOfcontract100after24hours,percentOfcontract10after28hours,percentOfcontract25after28hours,percentOfcontract50after28hours,percentOfcontract100after28hours,percentOfcontract10after1week,percentOfcontract25after1week,percentOfcontract50after1week,percentOfcontract100after1week,percentOfcontract10after2weeks,percentOfcontract25after2weeks,percentOfcontract50after2weeks,percentOfcontract100after2weeks,percentOfcontract10,percentOfcontract25,percentOfcontract50,percentOfcontract100] on the enum `Booking_itemAgreedLateCancelationPolicyCharge` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `earlyCancellationPolicy` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `lateCancellationPolicy` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserRenteeProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `UserRenteeProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `UserRenteeProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserRenteeProfile` DROP FOREIGN KEY `UserRenteeProfile_userId_fkey`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `itemAgreedLateCancelationPolicy`,
    ADD COLUMN `itemAgreedLateCancelationPolicyCharge` ENUM('free', 'percent10', 'percent25', 'percent50', 'percent100', 'customPolicy') NULL,
    ADD COLUMN `itemAgreedLateCancelationPolicyTime` ENUM('weeks2', 'weeks1', 'hours48', 'hours24', 'customPolicy', 'none') NULL,
    MODIFY `itemAgreedEarlyCancelPolicy` ENUM('free', 'percent10', 'percent25', 'percent50', 'percent100', 'customPolicy') NOT NULL;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `earlyCancellationPolicy`,
    DROP COLUMN `lateCancellationPolicy`,
    ADD COLUMN `generalCancellationPolicy` ENUM('free', 'percent10', 'percent25', 'percent50', 'percent100', 'customPolicy') NULL,
    ADD COLUMN `lateCancellationPolicyCharge` ENUM('free', 'percent10', 'percent25', 'percent50', 'percent100', 'customPolicy') NULL,
    ADD COLUMN `lateCancellationPolicyTime` ENUM('weeks2', 'weeks1', 'hours48', 'hours24', 'customPolicy', 'none') NULL,
    ADD COLUMN `weekendRentPerDay` BOOLEAN NULL,
    ADD COLUMN `weekendRentPerDayPrice` DECIMAL(7, 2) NULL DEFAULT 0.00,
    ADD COLUMN `weekendRentPerHour` BOOLEAN NULL,
    ADD COLUMN `weekendRentPerHourPrice` DECIMAL(7, 2) NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `UserRenteeProfile` DROP COLUMN `userId`,
    ADD COLUMN `accountId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserRenteeProfile_accountId_key` ON `UserRenteeProfile`(`accountId`);

-- AddForeignKey
ALTER TABLE `UserRenteeProfile` ADD CONSTRAINT `UserRenteeProfile_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
