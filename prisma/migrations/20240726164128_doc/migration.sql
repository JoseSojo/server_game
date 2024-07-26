/*
  Warnings:

  - You are about to drop the column `uuid` on the `MasterDocuments` table. All the data in the column will be lost.
  - The required column `publicId` was added to the `MasterDocuments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MasterDocuments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "documentPath" TEXT NOT NULL DEFAULT '',
    "documentDownload" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',
    "use" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_MasterDocuments" ("documentDownload", "documentPath", "id", "type", "use") SELECT "documentDownload", "documentPath", "id", "type", "use" FROM "MasterDocuments";
DROP TABLE "MasterDocuments";
ALTER TABLE "new_MasterDocuments" RENAME TO "MasterDocuments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
