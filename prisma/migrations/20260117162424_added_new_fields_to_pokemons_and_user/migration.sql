/*
  Warnings:

  - You are about to drop the column `image` on the `pokemons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `pokemons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "image",
ADD COLUMN     "externalId" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_externalId_key" ON "pokemons"("externalId");
