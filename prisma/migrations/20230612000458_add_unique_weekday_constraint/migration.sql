/*
  Warnings:

  - A unique constraint covering the columns `[weekday,user_id]` on the table `user_time_intervals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_time_intervals_weekday_user_id_key" ON "user_time_intervals"("weekday", "user_id");
