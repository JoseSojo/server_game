/*
  Warnings:

  - You are about to drop the column `gameName` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `name` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "devices" TEXT NOT NULL DEFAULT 'mobile'
);
INSERT INTO "new_Game" ("devices", "id") SELECT "devices", "id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startSession" DATETIME NOT NULL,
    "endSession" DATETIME,
    "token" TEXT NOT NULL,
    "dataId" INTEGER NOT NULL,
    CONSTRAINT "Session_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "DataUserGame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("endSession", "id", "startSession", "token") SELECT "endSession", "id", "startSession", "token" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
