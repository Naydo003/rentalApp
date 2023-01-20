/*
  Warnings:

  - You are about to drop the column `Age` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Brand` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Model` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `Age`,
    DROP COLUMN `Brand`,
    DROP COLUMN `Model`,
    ADD COLUMN `age` TINYINT NULL,
    ADD COLUMN `brand` VARCHAR(191) NULL,
    ADD COLUMN `model` VARCHAR(191) NULL;
