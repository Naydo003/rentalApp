/*
  Warnings:

  - Added the required column `accountBlacklistedOn` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Made the column `homeAddress` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `goodForIndicator` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `MessageChain` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MessageChain` DROP FOREIGN KEY `MessageChain_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `RenteesClaimImages` DROP FOREIGN KEY `RenteesClaimImages_claimId_fkey`;

-- DropForeignKey
ALTER TABLE `RenteesClaimImages` DROP FOREIGN KEY `RenteesClaimImages_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `RentersClaimImages` DROP FOREIGN KEY `RentersClaimImages_claimId_fkey`;

-- DropForeignKey
ALTER TABLE `RentersClaimImages` DROP FOREIGN KEY `RentersClaimImages_transactionId_fkey`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `accountBlacklistedOn` DATETIME(3) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `emailVerifiedOn` DATETIME(3) NULL,
    ADD COLUMN `identificationDoc1url` VARCHAR(191) NULL,
    ADD COLUMN `identificationDoc2url` VARCHAR(191) NULL,
    ADD COLUMN `identifyingImageUrl` VARCHAR(191) NULL,
    ADD COLUMN `identityDocumentsVerifiedBy` VARCHAR(191) NULL,
    ADD COLUMN `identityDocumentsVerifiedOn` DATETIME(3) NULL,
    ADD COLUMN `phoneNumber` INTEGER NOT NULL,
    ADD COLUMN `phoneNumberVerifiedOn` DATETIME(3) NULL,
    ADD COLUMN `profilePictureUrl` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `homeAddress` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `Age` TINYINT NULL,
    ADD COLUMN `Brand` VARCHAR(191) NULL,
    ADD COLUMN `Model` VARCHAR(191) NULL,
    ADD COLUMN `SpecialItemModifyer` ENUM('ElectricalAppliance', 'Car', 'EngineOver50cc', 'Clothing', 'Property') NULL,
    ADD COLUMN `goodForIndicator` ENUM('kids', 'teenagers', 'adults', 'couples', 'families', 'groups', 'holiday', 'anAfternoon', 'aWeekend', 'tightBudget', 'tasteOfLuxury') NOT NULL,
    ADD COLUMN `importantNote` VARCHAR(191) NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MessageChain` ADD COLUMN `investigationId` INTEGER NULL,
    ADD COLUMN `type` ENUM('bookingQuery', 'investigation', 'inbound', 'notice') NOT NULL,
    MODIFY `bookingId` INTEGER NULL;

-- AlterTable
ALTER TABLE `RenteesClaimImages` MODIFY `transactionId` INTEGER NULL,
    MODIFY `claimId` INTEGER NULL;

-- AlterTable
ALTER TABLE `RentersClaimImages` MODIFY `transactionId` INTEGER NULL,
    MODIFY `claimId` INTEGER NULL;

-- AlterTable
ALTER TABLE `UserRenteeProfile` ADD COLUMN `isSuspended` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserRenterProfile` ADD COLUMN `isSuspended` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `ItemPhotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `order` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `flagType` ENUM('suspectedInsuranceScamer', 'suspectedBot', 'suspectedPolicyBreach', 'theftClaimAgainst', 'unresolvedDamageClaim', 'highDamageClaimRate', 'unresolvedTransaction', 'consistentLowRating', 'suspectedIdentityFraud') NOT NULL,
    `investigatingAgent` VARCHAR(191) NOT NULL,
    `actions` VARCHAR(191) NOT NULL,
    `recommendations` VARCHAR(191) NOT NULL,
    `result` ENUM('warned', 'accountSuspendedUntilRectified', 'userBlacklisted') NOT NULL,
    `isClosed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemPhotos` ADD CONSTRAINT `ItemPhotos_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investigation` ADD CONSTRAINT `Investigation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentersClaimImages` ADD CONSTRAINT `RentersClaimImages_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentersClaimImages` ADD CONSTRAINT `RentersClaimImages_claimId_fkey` FOREIGN KEY (`claimId`) REFERENCES `Claim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteesClaimImages` ADD CONSTRAINT `RenteesClaimImages_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteesClaimImages` ADD CONSTRAINT `RenteesClaimImages_claimId_fkey` FOREIGN KEY (`claimId`) REFERENCES `RenteeClaim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageChain` ADD CONSTRAINT `MessageChain_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageChain` ADD CONSTRAINT `MessageChain_investigationId_fkey` FOREIGN KEY (`investigationId`) REFERENCES `Investigation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
