import { PhaseRepository } from "../database/repositorys/PhaseRepository";
import { ProgressPhaseRepository } from "../database/repositorys/ProgressPhaseRepository";
import { UserRepository } from "../database/repositorys/UserRepository";
import { ICreateProgress, IUpdateProgress } from "../models/dtos/ProgressDto";

export class ProgressPhaseService {
    constructor(
        private progressPhaseRepository: ProgressPhaseRepository,
        private userRepository: UserRepository,
        private phaseRepository: PhaseRepository
    ) {}

    async create(data: ICreateProgress) {
        const user = await this.userRepository.findById(data.user_id);
        const phase = await this.phaseRepository.findById(data.phase_id);

        if (!user ||!phase) {
            throw new Error("User or Phase not found");
        }

        const progressPhase = await this.progressPhaseRepository.create(data);
        return progressPhase;
    }
    
    async update(progressPhaseId: string, data: IUpdateProgress) {
        const existingProgress = await this.progressPhaseRepository.findById(progressPhaseId);
    
        if (!existingProgress) {
            throw new Error("Progress Phase not found");
        }
    
        const updatedProgress = await this.progressPhaseRepository.update(progressPhaseId, data);
        return updatedProgress;
    }
    
    
    async getByUserId(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error(`User Not Found: ${user}`)
        }

        const progressPhases = await this.progressPhaseRepository.findByUserId(userId);

        return progressPhases;
    }
}