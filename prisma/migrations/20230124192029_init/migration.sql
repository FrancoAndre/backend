-- DropForeignKey
ALTER TABLE `stock_materials` DROP FOREIGN KEY `stock_materials_productId_fkey`;

-- AlterTable
ALTER TABLE `stock_materials` MODIFY `productId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `stock_materials` ADD CONSTRAINT `stock_materials_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
