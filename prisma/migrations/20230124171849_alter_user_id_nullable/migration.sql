/*
  Warnings:

  - You are about to drop the column `UserReceivingId` on the `receiving_logistics` table. All the data in the column will be lost.
  - Added the required column `userReceivingId` to the `receiving_logistics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `receiving_logistics` DROP FOREIGN KEY `receiving_logistics_UserReceivingId_fkey`;

-- AlterTable
ALTER TABLE `receiving_logistics` DROP COLUMN `UserReceivingId`,
    ADD COLUMN `userReceivingId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `receiving_logistics` ADD CONSTRAINT `receiving_logistics_userReceivingId_fkey` FOREIGN KEY (`userReceivingId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
