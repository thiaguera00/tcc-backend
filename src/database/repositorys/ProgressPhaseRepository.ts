import { prisma } from "..";
import { ICreateProgress, IUpdateProgress } from "../../models/dtos/ProgressDto";

export class ProgressPhaseRepository {
    async create(data: ICreateProgress) {
        return await prisma.progressPhase.create({
            data: {
                user_id: data.user_id,
                phase_id: data.phase_id,
                status: data.status,
                score: data.score,
                finished_at: null,
            },
        });
    }

    async update(progressPhaseId: string, data: IUpdateProgress) {
        return await prisma.progressPhase.update({
            where: { id: progressPhaseId },
            data: {
                user_id: data.user_id?? undefined,
                phase_id: data.phase_id?? undefined,
                status: data.status?? undefined,
                score: data.score?? undefined,
                finished_at: data.finished_at?? undefined,
            },
        });
    }

    async findByUserId(userId: string) {
        return await prisma.progressPhase.findMany({
            where: { user_id: userId },
        });
    }

    async findByUserIdAndPhaseId(userId: string, phaseId: string) {
        return await prisma.progressPhase.findFirst({
            where: { user_id: userId, phase_id: phaseId },
        });
    }

    async findById(progressPhaseId: string) {
        return await prisma.progressPhase.findUnique({
            where: { id: progressPhaseId },
        });
    }
}