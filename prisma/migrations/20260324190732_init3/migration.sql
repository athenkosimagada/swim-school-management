/*
  Warnings:

  - You are about to drop the column `birthDate` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `medicalNotes` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `napSchedule` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `skillLevel` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill_level` to the `children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "children" DROP CONSTRAINT "children_userId_fkey";

-- DropIndex
DROP INDEX "children_userId_idx";

-- AlterTable
ALTER TABLE "children" DROP COLUMN "birthDate",
DROP COLUMN "medicalNotes",
DROP COLUMN "name",
DROP COLUMN "napSchedule",
DROP COLUMN "skillLevel",
DROP COLUMN "userId",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "medical_notes" TEXT,
ADD COLUMN     "nap_schedule" TEXT,
ADD COLUMN     "skill_level" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "passwordHash",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "children_user_id_idx" ON "children"("user_id");

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
