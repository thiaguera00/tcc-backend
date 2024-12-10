import { prisma } from "..";

export class PhaseRepository {
    async create(data: { title: string; description: string; contentDescription: string;}) {
        const lastPhase = await prisma.phase.findFirst({
            orderBy: {
                order: 'desc',
            },
        });
    
        const newOrder = lastPhase ? lastPhase.order + 1 : 1;
        const newPhase = await prisma.phase.create({
            data: {
                title: data.title,
                description: data.description,
                order: newOrder,
                content: {
                    create: {
                        description: data.contentDescription,
                    },
                },
                created_at: new Date(),
                update_at: new Date(),
            },
        });
    
        return newPhase;
    }

    async findAll() {
        return await prisma.phase.findMany({
            include: { content: true },
            orderBy: {
                order: 'asc',
            },
        });
    }
    

    async findById(id: string) {
        return await prisma.phase.findUnique({
            where: { id },
            include: { content: true },
        });
    }

    async update(id: string, data: { title?: string, description?: string, contentDescription?: string,}) {
        return await prisma.phase.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                content: data.contentDescription ? { update: { description: data.contentDescription } } : undefined,
            },
            include: { content: true },
        });
    }

    async delete(id: string) {
        return await prisma.phase.delete({
            where: { id },
        });
    }

    async findPreviousPhase(currentPhaseId: string) {
        const currentPhase = await this.findById(currentPhaseId);
        if (!currentPhase) {
            throw new Error("Phase not found");
        }
    
        const previousPhase = await prisma.phase.findFirst({
            where: {
                order: currentPhase.order - 1,
            },
        });
    
        return previousPhase;
    }
}

