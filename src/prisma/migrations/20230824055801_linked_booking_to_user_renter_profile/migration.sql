/*
  Warnings:

  - Added the required column `userRenterId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `userRenterId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userRenterId_fkey` FOREIGN KEY (`userRenterId`) REFERENCES `UserRenterProfile`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
