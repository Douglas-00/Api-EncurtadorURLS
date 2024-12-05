/*
  Warnings:

  - You are about to drop the `ClickLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClickLog" DROP CONSTRAINT "ClickLog_urlId_fkey";

-- DropForeignKey
ALTER TABLE "ClickLog" DROP CONSTRAINT "ClickLog_userId_fkey";

-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "clicks" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "ClickLog";
