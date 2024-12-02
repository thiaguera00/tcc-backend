import { prisma } from "..";

export class PasswordResetRepository {
    async createToken(userId: string, token: string, expiresAt: Date) {
        return await prisma.passwordReset.create({
            data: {
                userId,
                token,
                expiresAt,
            },
        });
    }

    async findByToken(token: string) {
        return await prisma.passwordReset.findFirst({
            where: {
                token,
                expiresAt: {
                    gte: new Date(),
                },
            },
        });
    }

    async deleteToken(token: string) {
        return await prisma.passwordReset.delete({
            where: { token },
        });
    }
}
