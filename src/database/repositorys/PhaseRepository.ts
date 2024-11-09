import { prisma } from "..";

export class PhaseRepository {
    async create(data: { title: string, description: string, contentDescription: string }) {
        return await prisma.phase.create({
            data: {
                title: data.title,
                description: data.description,
                content: {
                    create: {
                        description: data.contentDescription,
                    },
                },
            },
            include: { content: true },
        });
    }

    async findAll() {
        return await prisma.phase.findMany({
            include: { content: true },
        });
    }

    async findById(id: string) {
        return await prisma.phase.findUnique({
            where: { id },
            include: { content: true },
        });
    }

    async update(id: string, data: { title?: string, description?: string, contentDescription?: string }) {
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
}

