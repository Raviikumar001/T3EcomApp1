-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
