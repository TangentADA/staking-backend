-- CreateTable
CREATE TABLE "Unit" (
    "unit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "value" BIGINT NOT NULL,
    "unitUnit" TEXT NOT NULL,
    "snapshotId" INTEGER,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" SERIAL NOT NULL,
    "keyhash" TEXT NOT NULL,
    "poolId" INTEGER,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" SERIAL NOT NULL,
    "poolIndex" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidTx" (
    "id" SERIAL NOT NULL,
    "txHash" TEXT NOT NULL,
    "keyhash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValidTx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakenTxO" (
    "id" SERIAL NOT NULL,
    "txHash" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TakenTxO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unit_key" ON "Unit"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_poolIndex_key" ON "Pool"("poolIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ValidTx_txHash_key" ON "ValidTx"("txHash");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_unitUnit_fkey" FOREIGN KEY ("unitUnit") REFERENCES "Unit"("unit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE SET NULL ON UPDATE CASCADE;
