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
    "profilePhotoId" INTEGER,
    CONSTRAINT "DataUserGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_GameId_fkey" FOREIGN KEY ("GameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "MasterSubscriptions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "MasterLevels" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DataUserGame_profilePhotoId_fkey" FOREIGN KEY ("profilePhotoId") REFERENCES "MasterDocuments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DataUserGame" ("GameId", "coin", "id", "languaje", "levelId", "profilePhotoId", "subscriptionId", "userId") SELECT "GameId", "coin", "id", "languaje", "levelId", "profilePhotoId", "subscriptionId", "userId" FROM "DataUserGame";
DROP TABLE "DataUserGame";
ALTER TABLE "new_DataUserGame" RENAME TO "DataUserGame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
