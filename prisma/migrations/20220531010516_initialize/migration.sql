-- CreateTable
CREATE TABLE "Unit" (
    "unit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" BIGINT NOT NULL,
    "unitUnit" TEXT NOT NULL,
    "snapshotId" INTEGER,
    CONSTRAINT "Asset_unitUnit_fkey" FOREIGN KEY ("unitUnit") REFERENCES "Unit" ("unit") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Asset_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyhash" TEXT NOT NULL,
    "poolId" INTEGER,
    CONSTRAINT "Snapshot_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poolIndex" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ValidTx" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "txHash" TEXT NOT NULL,
    "keyhash" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TakenTxO" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "txHash" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unit_key" ON "Unit"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_poolIndex_key" ON "Pool"("poolIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ValidTx_txHash_key" ON "ValidTx"("txHash");
