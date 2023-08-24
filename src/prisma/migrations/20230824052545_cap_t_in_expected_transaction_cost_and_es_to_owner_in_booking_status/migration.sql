/*
  Warnings:

  - You are about to drop the column `expectedTransactionCost` on the `Booking` table. All the data in the column will be lost.
  - The values [modRequestedByEscort,modRequestOrCancelByEscort,cancelledByEscort] on the enum `Booking_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `expectedTransactionCost` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `expectedTransactionCost`,
    ADD COLUMN `expectedTransactionCost` DECIMAL(7, 2) NOT NULL,
    MODIFY `status` ENUM('requested', 'accepted', 'declined', 'retracted', 'confirmed', 'modRequestedByUser', 'modRequestOrCancelByUser', 'cancelledByUser', 'modRequestedByOwner', 'modRequestOrCancelByOwner', 'cancelledByOwner', 'inProgress', 'completed', 'closed') NOT NULL DEFAULT 'requested';
