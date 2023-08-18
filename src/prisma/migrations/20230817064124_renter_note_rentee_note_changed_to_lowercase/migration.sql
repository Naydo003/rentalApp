/*
  Warnings:

  - You are about to drop the column `RenteeNote` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `RenterNote` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `renteeNote` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `RenteeNote`,
    DROP COLUMN `RenterNote`,
    ADD COLUMN `renteeNote` VARCHAR(191) NOT NULL,
    ADD COLUMN `renterNote` VARCHAR(191) NULL;
