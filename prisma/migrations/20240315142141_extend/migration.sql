/*
  Warnings:

  - Added the required column `imageFullUrl` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLinkHTML` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageThumbUrl` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUserName` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "imageThumbUrl" TEXT NOT NULL,
    "imageFullUrl" TEXT NOT NULL,
    "imageUserName" TEXT NOT NULL,
    "imageLinkHTML" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Board" ("id", "title") SELECT "id", "title" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
