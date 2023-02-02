/*
  Warnings:

  - You are about to alter the column `paidOff` on the `receiving_logistics` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- DropForeignKey
ALTER TABLE `receiving_logistics` DROP FOREIGN KEY `receiving_logistics_userPaidOffId_fkey`;

-- AlterTable
ALTER TABLE `receiving_logistics` MODIFY `paidOff` BOOLEAN NULL,
    MODIFY `userPaidOffId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `receiving_logistics` ADD CONSTRAINT `receiving_logistics_userPaidOffId_fkey` FOREIGN KEY (`userPaidOffId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
