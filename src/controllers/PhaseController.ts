import { Request, Response } from 'express';
import { PhaseService } from '../services/PhaseService';


export class PhaseController {
    constructor(private phaseService: PhaseService) {}

    async createPhase(req: Request, res: Response): Promise<Response> {
        try {
            const { title, description, contentDescription, count } = req.body;
            const phase = await this.phaseService.createPhase({ title, description, count, contentDescription });
            return res.status(201).json(phase);
        } catch (err) {
            console.error('Error creating phase:', err);
            return res.status(500).json({ error: 'Error creating phase' });
        }
    }

    async getPhases(req: Request, res: Response): Promise<Response> {
        try {
            const phases = await this.phaseService.getPhases();
            return res.status(200).json(phases);
        } catch (err) {
            console.error('Error fetching phases:', err);
            return res.status(500).json({ error: 'Error fetching phases' });
        }
    }

    async getPhaseById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const phase = await this.phaseService.getPhaseById(id);
            if (!phase) {
                return res.status(404).json({ error: 'Phase not found' });
            }
            return res.status(200).json(phase);
        } catch (err) {
            console.error('Error fetching phase by ID:', err);
            return res.status(500).json({ error: 'Error fetching phase' });
        }
    }

    async updatePhase(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { title, description, contentDescription, count } = req.body;
            const phase = await this.phaseService.updatePhase(id, { title, description, contentDescription, count });
            return res.status(200).json(phase);
        } catch (err) {
            console.error('Error updating phase:', err);
            return res.status(500).json({ error: 'Error updating phase' });
        }
    }

    async deletePhase(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.phaseService.deletePhase(id);
            return res.status(204).send();
        } catch (err) {
            console.error('Error deleting phase:', err);
            return res.status(500).json({ error: 'Error deleting phase' });
        }
    }
}
