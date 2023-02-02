/*
  Warnings:

  - Made the column `productId` on table `stock_materials` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `stock_materials` DROP FOREIGN KEY `stock_materials_productId_fkey`;

-- AlterTable
ALTER TABLE `stock_materials` MODIFY `productId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `stock_materials` ADD CONSTRAINT `stock_materials_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
