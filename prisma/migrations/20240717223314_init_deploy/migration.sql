-- CreateTable
CREATE TABLE "MasterDocuments" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "documentPath" TEXT NOT NULL,
    "documentDownload" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "use" TEXT NOT NULL,

    CONSTRAINT "MasterDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterSubscriptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MasterSubscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterLevels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MasterLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "coin" INTEGER NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "last_session" TIMESTAMP(3),
    "rol" TEXT NOT NULL DEFAULT 'USER',
    "profilePhotoId" INTEGER,
    "wallpaperPhotoId" INTEGER,
    "subscriptionId" INTEGER,
    "levelId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "startSession" TIMESTAMP(3) NOT NULL,
    "endSession" TIMESTAMP(3),
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "redirect" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterSubscriptions_name_key" ON "MasterSubscriptions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MasterLevels_name_key" ON "MasterLevels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "fields: [user]" FOREIGN KEY ("profilePhotoId") REFERENCES "MasterDocuments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "fields: [wallpaper]" FOREIGN KEY ("profilePhotoId") REFERENCES "MasterDocuments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "MasterSubscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "MasterLevels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
