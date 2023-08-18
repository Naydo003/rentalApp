/*
  Warnings:

  - The values [min1week] on the enum `Item_weekendMinimumRentalPeriod` will be removed. If these variants are still used in the database, this will fail.
  - The values [min1week] on the enum `Item_weekendMinimumRentalPeriod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `minimumRentalPeriod` ENUM('none', 'min1hour', 'min2hours', 'min3hours', 'min4hours', 'min5hours', 'min6hours', 'min7hours', 'min8hours', 'min9hours', 'min10hours', 'min11hours', 'min12hours', 'min1day', 'min2days', 'min3days', 'min4days', 'min5days', 'min6days', 'min7days', 'min8days', 'min9days', 'min10days', 'min11days', 'min12week', 'min13days', 'min2weeks', 'min3weeks', 'min4weeks') NULL,
    MODIFY `weekendMinimumRentalPeriod` ENUM('none', 'min1hour', 'min2hours', 'min3hours', 'min4hours', 'min5hours', 'min6hours', 'min7hours', 'min8hours', 'min9hours', 'min10hours', 'min11hours', 'min12hours', 'min1day', 'min2days', 'min3days', 'min4days', 'min5days', 'min6days', 'min7days', 'min8days', 'min9days', 'min10days', 'min11days', 'min12week', 'min13days', 'min2weeks', 'min3weeks', 'min4weeks') NULL;
