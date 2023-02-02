-- AlterTable
ALTER TABLE `stock_materials` ADD COLUMN `referenceId` VARCHAR(191) NULL,
    ADD COLUMN `requisitionId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `stock_materials` ADD CONSTRAINT `stock_materials_requisitionId_fkey` FOREIGN KEY (`requisitionId`) REFERENCES `logistics_requisition`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
