/*
  Warnings:

  - You are about to drop the column `type` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "type",
DROP COLUMN "userId";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "AddressType";
