-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `condition` ENUM('asGoodAsNew', 'aFewScuffs', 'heavilyUsed', 'oldAndTemperamental') NOT NULL,
    `userRenterId` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL,
    `category` VARCHAR(191) NULL,
    `itemNewValue` DECIMAL(9, 2) NOT NULL,
    `rentPerHour` BOOLEAN NOT NULL,
    `rentPerHourPrice` DECIMAL(7, 2) NULL DEFAULT 0.00,
    `rentPerDay` BOOLEAN NOT NULL,
    `rentPerDayPrice` DECIMAL(7, 2) NULL DEFAULT 0.00,
    `rentPerWeek` BOOLEAN NOT NULL,
    `rentPerWeekPrice` DECIMAL(7, 2) NULL DEFAULT 0.00,
    `minimumRentalPeriod` ENUM('noMinimum', 'min1hour', 'min2hours', 'min3hours', 'min4hours', 'min5hours', 'min8hours', 'min10hours', 'min12hours', 'min1day', 'min2days', 'min3days', 'min4days', 'min5days', 'min1week', 'min2weeks', 'min3weeks', 'min4weeksOrGreater') NOT NULL,
    `earlyCancellationPolicy` ENUM('freeCancellation', 'percentOfcontract10after24hours', 'percentOfcontract25after24hours', 'percentOfcontract50after24hours', 'percentOfcontract100after24hours', 'percentOfcontract10after28hours', 'percentOfcontract25after28hours', 'percentOfcontract50after28hours', 'percentOfcontract100after28hours', 'percentOfcontract10after1week', 'percentOfcontract25after1week', 'percentOfcontract50after1week', 'percentOfcontract100after1week', 'percentOfcontract10after2weeks', 'percentOfcontract25after2weeks', 'percentOfcontract50after2weeks', 'percentOfcontract100after2weeks', 'percentOfcontract10', 'percentOfcontract25', 'percentOfcontract50', 'percentOfcontract100', 'customPolicy') NOT NULL,
    `lateCancellationPolicy` ENUM('freeCancellation', 'percentOfcontract10after24hours', 'percentOfcontract25after24hours', 'percentOfcontract50after24hours', 'percentOfcontract100after24hours', 'percentOfcontract10after28hours', 'percentOfcontract25after28hours', 'percentOfcontract50after28hours', 'percentOfcontract100after28hours', 'percentOfcontract10after1week', 'percentOfcontract25after1week', 'percentOfcontract50after1week', 'percentOfcontract100after1week', 'percentOfcontract10after2weeks', 'percentOfcontract25after2weeks', 'percentOfcontract50after2weeks', 'percentOfcontract100after2weeks', 'percentOfcontract10', 'percentOfcontract25', 'percentOfcontract50', 'percentOfcontract100', 'customPolicy') NULL,
    `customCancellationPolicy` VARCHAR(191) NOT NULL,
    `lateReturnPolicy` ENUM('chargeForEachAdditionalHour', 'chargeForEachAdditionalDay', 'chargeForEachAdditionalHourPlus15', 'chargeForEachAdditionalDayPlus15', 'chargeForEachAdditionalHourPlus25', 'chargeForEachAdditionalDayPlus25', 'customPolicy') NOT NULL,
    `insuranced` BOOLEAN NOT NULL,
    `hasClaims` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `homeAddress` TEXT NULL,
    `isRenter` BOOLEAN NOT NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRenteeProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `recentSearch1` VARCHAR(191) NULL,
    `recentSearch2` VARCHAR(191) NULL,
    `recentSearch3` VARCHAR(191) NULL,
    `recentSearch4` VARCHAR(191) NULL,
    `isUnrated` BOOLEAN NOT NULL DEFAULT true,
    `rating` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `transactionCount` SMALLINT NOT NULL DEFAULT 0,
    `transactionValue` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,

    UNIQUE INDEX `UserRenteeProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRenterProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isUnrated` BOOLEAN NOT NULL DEFAULT true,
    `rating` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `avgResponseTime` DOUBLE NOT NULL,
    `transactionCount` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `UserRenterProfile_userEmail_key`(`userEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `itemAgreedRate` DECIMAL(7, 2) NOT NULL,
    `itemAgreedEarlyCancelPolicy` ENUM('freeCancellation', 'percentOfcontract10after24hours', 'percentOfcontract25after24hours', 'percentOfcontract50after24hours', 'percentOfcontract100after24hours', 'percentOfcontract10after28hours', 'percentOfcontract25after28hours', 'percentOfcontract50after28hours', 'percentOfcontract100after28hours', 'percentOfcontract10after1week', 'percentOfcontract25after1week', 'percentOfcontract50after1week', 'percentOfcontract100after1week', 'percentOfcontract10after2weeks', 'percentOfcontract25after2weeks', 'percentOfcontract50after2weeks', 'percentOfcontract100after2weeks', 'percentOfcontract10', 'percentOfcontract25', 'percentOfcontract50', 'percentOfcontract100', 'customPolicy') NOT NULL,
    `itemAgreedLateCancelationPolicy` ENUM('freeCancellation', 'percentOfcontract10after24hours', 'percentOfcontract25after24hours', 'percentOfcontract50after24hours', 'percentOfcontract100after24hours', 'percentOfcontract10after28hours', 'percentOfcontract25after28hours', 'percentOfcontract50after28hours', 'percentOfcontract100after28hours', 'percentOfcontract10after1week', 'percentOfcontract25after1week', 'percentOfcontract50after1week', 'percentOfcontract100after1week', 'percentOfcontract10after2weeks', 'percentOfcontract25after2weeks', 'percentOfcontract50after2weeks', 'percentOfcontract100after2weeks', 'percentOfcontract10', 'percentOfcontract25', 'percentOfcontract50', 'percentOfcontract100', 'customPolicy') NULL,
    `agreedDeposit` DECIMAL(7, 2) NOT NULL,
    `expectedtransactionCost` DECIMAL(7, 2) NOT NULL,
    `customCancellationPolicy` VARCHAR(191) NULL,
    `itemAgreedLateReturnPolicy` ENUM('chargeForEachAdditionalHour', 'chargeForEachAdditionalDay', 'chargeForEachAdditionalHourPlus15', 'chargeForEachAdditionalDayPlus15', 'chargeForEachAdditionalHourPlus25', 'chargeForEachAdditionalDayPlus25', 'customPolicy') NULL,
    `customLateReturnPolicy` VARCHAR(191) NOT NULL,
    `pickUpTime` DATETIME(3) NOT NULL,
    `returnTime` DATETIME(3) NOT NULL,
    `RenterNote` VARCHAR(191) NULL,
    `RenteeNote` VARCHAR(191) NOT NULL,
    `statusAccepted` BOOLEAN NOT NULL DEFAULT false,
    `acceptedOnDate` DATETIME(3) NULL,
    `statusDeclined` BOOLEAN NOT NULL DEFAULT false,
    `declinedOnDate` DATETIME(3) NULL,
    `modRequest` BOOLEAN NULL,
    `modPickUpTime` DATETIME(3) NULL,
    `modReturnTime` DATETIME(3) NULL,
    `statusCancelled` BOOLEAN NOT NULL DEFAULT false,
    `cancelledOnDate` DATETIME(3) NULL,
    `bookingClosedOnDate` DATETIME(3) NULL,
    `transactionStatus` ENUM('uninitialized', 'open', 'awaitingDepositDebit', 'awaitingBookingDebit', 'awaitingPickupProcessing', 'awaitingCancellationProcessing', 'awaitingDropOffProcessing', 'awaitingLateReturnProcessing', 'awaitingRenteeClaimProcessing', 'awaitingRenterClaimProcessing', 'awaitingRenteeRefund', 'awaitingAdditionalDebit', 'awaitingRenterCredit', 'closed') NOT NULL DEFAULT 'uninitialized',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('uninitialized', 'open', 'awaitingDepositDebit', 'awaitingBookingDebit', 'awaitingPickupProcessing', 'awaitingCancellationProcessing', 'awaitingDropOffProcessing', 'awaitingLateReturnProcessing', 'awaitingRenteeClaimProcessing', 'awaitingRenterClaimProcessing', 'awaitingRenteeRefund', 'awaitingAdditionalDebit', 'awaitingRenterCredit', 'closed') NOT NULL,
    `depositDebitsSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `depositReturnSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `bookingDebitSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `renterConfirmDispatch` BOOLEAN NULL,
    `rentersOnDispatchReport` VARCHAR(191) NULL,
    `renteeConfirmReciept` BOOLEAN NULL,
    `renteeOnPickUpNotes` VARCHAR(191) NULL,
    `pickUpTime` DATETIME(3) NULL,
    `ReturnTime` DATETIME(3) NULL,
    `enactedCancellationPolicy` BOOLEAN NOT NULL DEFAULT false,
    `cancellationForgiven` BOOLEAN NULL,
    `enactedLateReturnPolicy` BOOLEAN NOT NULL DEFAULT false,
    `lateReturnForgiven` BOOLEAN NULL,
    `openRenterClaim` BOOLEAN NOT NULL DEFAULT false,
    `claimedAmountDebitOutstanding` BOOLEAN NOT NULL DEFAULT false,
    `openRenteeClaim` BOOLEAN NOT NULL DEFAULT false,
    `claimRefundCreditOutstanding` BOOLEAN NOT NULL DEFAULT false,
    `cancelledBookingRefund` DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
    `cancelledBookingRefundCreditOutstanding` BOOLEAN NOT NULL DEFAULT false,
    `renteeDepositCreditSuccessful` BOOLEAN NOT NULL DEFAULT false,
    `letePolicyAmountOwed` DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
    `latePolicyDebitsOutstanding` BOOLEAN NOT NULL DEFAULT false,
    `renterCreditSuccessful` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Transaction_bookingId_key`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRenteeId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rating` ENUM('rated1', 'rated2', 'rated3', 'rated4', 'rated5') NOT NULL,
    `publicComment` VARCHAR(191) NULL,
    `privateComment` VARCHAR(191) NULL,
    `reviewDisqualified` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RenteeReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRenterId` INTEGER NOT NULL,
    `userRenteeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rating` ENUM('rated1', 'rated2', 'rated3', 'rated4', 'rated5') NOT NULL,
    `publicComment` VARCHAR(191) NULL,
    `privateComment` VARCHAR(191) NULL,
    `reviewDisqualified` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Claim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `claimType` ENUM('damage', 'theft') NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `value` DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
    `statusClosed` BOOLEAN NOT NULL DEFAULT false,
    `closedAt` DATETIME(3) NULL,
    `result` ENUM('paid', 'rejected') NULL,
    `comments` VARCHAR(191) NULL,
    `report` VARCHAR(191) NULL,

    UNIQUE INDEX `Claim_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RentersClaimImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `info` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `claimId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RenteesClaimImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `info` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `claimId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RenteeClaim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `claimType` ENUM('itemNotWorking', 'conditionNotAsDescribed', 'itemBrokeFromNormalUse', 'problemWithPickup', 'other') NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `value` DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
    `statusClosed` BOOLEAN NOT NULL DEFAULT false,
    `closedAt` DATETIME(3) NULL,
    `result` ENUM('paid', 'rejected') NULL,
    `comments` VARCHAR(191) NULL,
    `report` VARCHAR(191) NULL,

    UNIQUE INDEX `RenteeClaim_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('depositReturn', 'bookingAmountRefund', 'totalRefund', 'claimReimbursement', 'renterPayment') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `creditAmount` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `paymentMethod` ENUM('stripe', 'paypal', 'googlePay') NOT NULL,
    `providersRecordId` VARCHAR(191) NULL,
    `success` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DebitRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('deposit', 'bookingDebit', 'latePolicyDebit', 'claimDebit') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `creditAmount` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `paymentMethod` ENUM('stripe', 'paypal', 'googlePay') NOT NULL,
    `providersRecordId` VARCHAR(191) NULL,
    `success` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessageChain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Subject` VARCHAR(191) NOT NULL,
    `bookingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `MessageChainId` INTEGER NOT NULL,
    `orderInChain` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_userRenterId_fkey` FOREIGN KEY (`userRenterId`) REFERENCES `UserRenterProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRenteeProfile` ADD CONSTRAINT `UserRenteeProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRenterProfile` ADD CONSTRAINT `UserRenterProfile_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `Account`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserRenteeProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemReview` ADD CONSTRAINT `ItemReview_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemReview` ADD CONSTRAINT `ItemReview_userRenteeId_fkey` FOREIGN KEY (`userRenteeId`) REFERENCES `UserRenteeProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteeReview` ADD CONSTRAINT `RenteeReview_userRenterId_fkey` FOREIGN KEY (`userRenterId`) REFERENCES `UserRenterProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteeReview` ADD CONSTRAINT `RenteeReview_userRenteeId_fkey` FOREIGN KEY (`userRenteeId`) REFERENCES `UserRenteeProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserRenteeProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentersClaimImages` ADD CONSTRAINT `RentersClaimImages_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentersClaimImages` ADD CONSTRAINT `RentersClaimImages_claimId_fkey` FOREIGN KEY (`claimId`) REFERENCES `Claim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteesClaimImages` ADD CONSTRAINT `RenteesClaimImages_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteesClaimImages` ADD CONSTRAINT `RenteesClaimImages_claimId_fkey` FOREIGN KEY (`claimId`) REFERENCES `RenteeClaim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteeClaim` ADD CONSTRAINT `RenteeClaim_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenteeClaim` ADD CONSTRAINT `RenteeClaim_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserRenterProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditRecord` ADD CONSTRAINT `CreditRecord_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitRecord` ADD CONSTRAINT `DebitRecord_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageChain` ADD CONSTRAINT `MessageChain_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_MessageChainId_fkey` FOREIGN KEY (`MessageChainId`) REFERENCES `MessageChain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
