/*
  Warnings:

  - The primary key for the `Follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Follow` table. All the data in the column will be lost.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Like` table. All the data in the column will be lost.
  - Made the column `followerId` on table `Follow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followingId` on table `Follow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Like` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tweetId` on table `Like` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_tweetId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_userId_fkey`;

-- AlterTable
ALTER TABLE `Follow` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `followerId` VARCHAR(191) NOT NULL,
    MODIFY `followingId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`followerId`, `followingId`);

-- AlterTable
ALTER TABLE `Like` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `tweetId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `tweetId`);

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_tweetId_fkey` FOREIGN KEY (`tweetId`) REFERENCES `Tweet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
