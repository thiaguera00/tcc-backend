import { PrismaClient } from '@prisma/client';
import { PhaseRepository } from '../database/repositorys/PhaseRepository';

export class PhaseService {
    constructor(private phaseRepository: PhaseRepository) {}
    async createPhase(data: { title: string, description: string, contentDescription: string}) {
        return await this.phaseRepository.create(data)
    }

    async getPhases() {
       return await this.phaseRepository.findAll();
    }

    async getPhaseById(id: string) {
        return await this.phaseRepository.findById(id);
    }

    async updatePhase(id: string, data: { title?: string, description?: string, contentDescription?: string, count?: number }) {
       return await this.phaseRepository.update(id, data);
    }

    async deletePhase(id: string) {
        return await this.phaseRepository.delete(id);
    }
}
