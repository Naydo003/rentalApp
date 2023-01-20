/*
  Warnings:

  - You are about to drop the column `userId` on the `UserRenterProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `UserRenterProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `UserRenterProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserRenterProfile` DROP FOREIGN KEY `UserRenterProfile_userId_fkey`;

-- AlterTable
ALTER TABLE `UserRenterProfile` DROP COLUMN `userId`,
    ADD COLUMN `accountId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserRenterProfile_accountId_key` ON `UserRenterProfile`(`accountId`);

-- AddForeignKey
ALTER TABLE `UserRenterProfile` ADD CONSTRAINT `UserRenterProfile_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
