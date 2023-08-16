/*
  Warnings:

  - The values [Car,Clothing,Book,Property] on the enum `Item_specialItem` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `weekendMinimumRentalPeriod` ENUM('noMinimum', 'min1hour', 'min2hours', 'min3hours', 'min4hours', 'min5hours', 'min8hours', 'min10hours', 'min12hours', 'min1day', 'min2days', 'min3days', 'min4days', 'min5days', 'min1week', 'min2weeks', 'min3weeks', 'min4weeksOrGreater') NULL,
    MODIFY `specialItem` ENUM('car', 'clothing', 'book', 'property') NULL;
