-- CreateTable
CREATE TABLE "search" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "level_knowledge" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "learning_objective" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "search_user_id_key" ON "search"("user_id");

-- AddForeignKey
ALTER TABLE "search" ADD CONSTRAINT "search_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
