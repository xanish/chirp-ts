/*
  Warnings:

  - The values [TWEET] on the enum `Attachment_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `parentId` on the `Tweet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tweet` DROP FOREIGN KEY `Tweet_parentId_fkey`;

-- AlterTable
ALTER TABLE `Attachment` MODIFY `type` ENUM('IMAGE', 'VIDEO') NOT NULL;

-- AlterTable
ALTER TABLE `Tweet` DROP COLUMN `parentId`,
    ADD COLUMN `relatedId` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('TWEET', 'REPLY', 'RETWEET', 'QUOTE') NOT NULL DEFAULT 'TWEET';

-- AddForeignKey
ALTER TABLE `Tweet` ADD CONSTRAINT `Tweet_relatedId_fkey` FOREIGN KEY (`relatedId`) REFERENCES `Tweet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
