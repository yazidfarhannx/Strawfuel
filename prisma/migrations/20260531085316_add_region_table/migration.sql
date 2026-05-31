-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "regionName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "strawPotential" DOUBLE PRECISION NOT NULL,
    "biomassPotential" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);
