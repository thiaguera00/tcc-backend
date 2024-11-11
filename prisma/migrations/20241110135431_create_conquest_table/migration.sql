-- CreateTable
CREATE TABLE "conquest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conquest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_conquest" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "conquest_id" TEXT NOT NULL,
    "obtained_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_conquest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_conquest" ADD CONSTRAINT "user_conquest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_conquest" ADD CONSTRAINT "user_conquest_conquest_id_fkey" FOREIGN KEY ("conquest_id") REFERENCES "conquest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
