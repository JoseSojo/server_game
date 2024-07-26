-- CreateTable
CREATE TABLE "MasterDocuments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "documentPath" TEXT NOT NULL,
    "documentDownload" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "use" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MasterSubscriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limitSensei" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "MasterLevels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "coin" INTEGER NOT NULL DEFAULT 3,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "last_session" DATETIME,
    "rol" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startSession" DATETIME NOT NULL,
    "endSession" DATETIME,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "redirect" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DataUserGame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DataUserGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coin" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameName" TEXT NOT NULL,
    "devices" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterSubscriptions_name_key" ON "MasterSubscriptions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MasterLevels_name_key" ON "MasterLevels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameName_key" ON "Game"("gameName");
