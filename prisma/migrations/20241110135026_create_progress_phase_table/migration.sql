-- CreateTable
CREATE TABLE "progress_phase" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "phase_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progress_phase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "progress_phase" ADD CONSTRAINT "progress_phase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_phase" ADD CONSTRAINT "progress_phase_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
