/*
  Warnings:

  - You are about to drop the column `userRenterId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `ownersRenterId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_userRenterId_fkey`;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `userRenterId`,
    ADD COLUMN `ownersRenterId` INTEGER NOT NULL,
    ADD COLUMN `pickUpAddress` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `condition` ENUM('asGoodAsNew', 'aFewScuffs', 'heavilyUsed', 'oldAndTemperamental') NULL,
    MODIFY `active` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `itemNewValue` DECIMAL(9, 2) NULL,
    MODIFY `rentPerHour` BOOLEAN NULL,
    MODIFY `rentPerDay` BOOLEAN NULL,
    MODIFY `minimumRentalPeriod` ENUM('noMinimum', 'min1hour', 'min2hours', 'min3hours', 'min4hours', 'min5hours', 'min8hours', 'min10hours', 'min12hours', 'min1day', 'min2days', 'min3days', 'min4days', 'min5days', 'min1week', 'min2weeks', 'min3weeks', 'min4weeksOrGreater') NULL,
    MODIFY `earlyCancellationPolicy` ENUM('freeCancellation', 'percentOfcontract10after24hours', 'percentOfcontract25after24hours', 'percentOfcontract50after24hours', 'percentOfcontract100after24hours', 'percentOfcontract10after28hours', 'percentOfcontract25after28hours', 'percentOfcontract50after28hours', 'percentOfcontract100after28hours', 'percentOfcontract10after1week', 'percentOfcontract25after1week', 'percentOfcontract50after1week', 'percentOfcontract100after1week', 'percentOfcontract10after2weeks', 'percentOfcontract25after2weeks', 'percentOfcontract50after2weeks', 'percentOfcontract100after2weeks', 'percentOfcontract10', 'percentOfcontract25', 'percentOfcontract50', 'percentOfcontract100', 'customPolicy') NULL,
    MODIFY `customCancellationPolicy` VARCHAR(191) NULL,
    MODIFY `lateReturnPolicy` ENUM('chargeForEachAdditionalHour', 'chargeForEachAdditionalDay', 'chargeForEachAdditionalHourPlus15', 'chargeForEachAdditionalDayPlus15', 'chargeForEachAdditionalHourPlus25', 'chargeForEachAdditionalDayPlus25', 'customPolicy') NULL,
    MODIFY `insuranced` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `hasClaims` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `goodForIndicator` ENUM('kids', 'teenagers', 'adults', 'couples', 'families', 'groups', 'holiday', 'anAfternoon', 'aWeekend', 'tightBudget', 'tasteOfLuxury') NULL,
    MODIFY `size` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_ownersRenterId_fkey` FOREIGN KEY (`ownersRenterId`) REFERENCES `UserRenterProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
