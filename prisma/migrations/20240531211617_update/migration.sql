/*
  Warnings:

  - You are about to drop the column `createAt` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Note` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Note` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
