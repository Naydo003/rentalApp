/*
  Warnings:

  - You are about to drop the column `userEmail` on the `UserRenterProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserRenterProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserRenterProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `transactionCount` on table `UserRenterProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `UserRenterProfile` DROP FOREIGN KEY `UserRenterProfile_userEmail_fkey`;

-- AlterTable
ALTER TABLE `UserRenterProfile` DROP COLUMN `userEmail`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `avgResponseTime` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `transactionCount` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `UserRenterProfile_userId_key` ON `UserRenterProfile`(`userId`);

-- AddForeignKey
ALTER TABLE `UserRenterProfile` ADD CONSTRAINT `UserRenterProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
