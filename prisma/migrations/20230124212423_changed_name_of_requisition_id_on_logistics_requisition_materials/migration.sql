/*
  Warnings:

  - You are about to drop the column `requisionId` on the `logistics_requisition_material` table. All the data in the column will be lost.
  - Added the required column `requisitionId` to the `logistics_requisition_material` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `logistics_requisition_material` DROP FOREIGN KEY `logistics_requisition_material_requisionId_fkey`;

-- AlterTable
ALTER TABLE `logistics_requisition_material` DROP COLUMN `requisionId`,
    ADD COLUMN `requisitionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `logistics_requisition_material` ADD CONSTRAINT `logistics_requisition_material_requisitionId_fkey` FOREIGN KEY (`requisitionId`) REFERENCES `logistics_requisition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
