-- AlterTable
ALTER TABLE `Account` MODIFY `isRenter` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `accountBlacklistedOn` DATETIME(3) NULL;
