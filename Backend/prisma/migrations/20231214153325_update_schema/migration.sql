/*
  Warnings:

  - You are about to drop the column `user_id` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_user_id_fkey`;

-- AlterTable
ALTER TABLE `Photo` DROP COLUMN `user_id`;
