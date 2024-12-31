/*
  Warnings:

  - You are about to drop the column `area` on the `addresses` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AddressLabel" AS ENUM ('HOME', 'OFFICE', 'FRIENDS', 'OTHER');

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "area",
ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "label" "AddressLabel" NOT NULL DEFAULT 'HOME';
