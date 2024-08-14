/*
  Warnings:

  - You are about to alter the column `prediction` on the `Forecast` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "Forecast" ALTER COLUMN "prediction" SET DATA TYPE DECIMAL(3,2);
