/*
  Warnings:

  - You are about to drop the column `limitSensei` on the `MasterSubscriptions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DataUserGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coin" INTEGER NOT NULL,
    "languaje" TEXT NOT NULL DEFAULT 'es',
    "userId" INTEGER NOT NULL,
    "GameId" INTEGER NOT NULL,
    "subscriptionId" INTEGER,
    "levelId" INTEGER,
    "profilePhotoId" INTEGER NOT NULL,
    CONSTRAINT "DataUserGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_GameId_fkey" FOREIGN KEY ("GameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "MasterSubscriptions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "MasterLevels" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_profilePhotoId_fkey" FOREIGN KEY ("profilePhotoId") REFERENCES "MasterDocuments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DataUserGame" ("GameId", "coin", "id", "levelId", "profilePhotoId", "subscriptionId", "userId") SELECT "GameId", "coin", "id", "levelId", "profilePhotoId", "subscriptionId", "userId" FROM "DataUserGame";
DROP TABLE "DataUserGame";
ALTER TABLE "new_DataUserGame" RENAME TO "DataUserGame";
CREATE TABLE "new_MasterSubscriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_MasterSubscriptions" ("description", "id", "name") SELECT "description", "id", "name" FROM "MasterSubscriptions";
DROP TABLE "MasterSubscriptions";
ALTER TABLE "new_MasterSubscriptions" RENAME TO "MasterSubscriptions";
CREATE UNIQUE INDEX "MasterSubscriptions_name_key" ON "MasterSubscriptions"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
