import { Request, Response } from "express";
import { ICreateProgress, IUpdateProgress } from "../models/dtos/ProgressDto";
import { ProgressPhaseService } from "../services/ProgressPhaseService";

export class ProgressPhaseController {
    constructor(private progressPhaseService: ProgressPhaseService) {}

    async createProgressPhase(req: Request, res: Response) {
        try {
            const createProgress: ICreateProgress = req.body;

            const progress = await this.progressPhaseService.create(createProgress);
            return res.status(200).json(progress);
        } catch(error) {
            console.error('Error creating progress phase:', error);
            return res.status(500).json( 'Error creating progress phase' );
        }
    }

    async getProgressByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const progress = await this.progressPhaseService.getByUserId(userId);
            return res.status(200).json(progress);
        } catch (error) {
            console.error(error);
            return res.status(500).json( 'Error creating progress phase' );
        }
    }

    async updateProgress(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const updateData: IUpdateProgress = req.body;
            const progress = await this.progressPhaseService.update(userId, updateData);
            return res.status(200).json(progress);
        } catch (error) {
            console.error(error);
            return res.status(500).json( 'Error updating progress phase' );
        }
    }
}