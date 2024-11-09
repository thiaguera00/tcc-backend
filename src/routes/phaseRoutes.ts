import { Router } from 'express';
import { PhaseController } from '../controllers/PhaseController';
import { PhaseService } from '../services/PhaseService';
import { PhaseRepository } from '../database/repositorys/PhaseRepository';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const phaseRoutes = Router();
const phaseRepository = new PhaseRepository();
const phaseService = new PhaseService(phaseRepository);
const phaseController = new PhaseController(phaseService);

phaseRoutes.post('/create', authMiddleware, async (req, res) => {
    await phaseController.createPhase(req, res);
});

phaseRoutes.get('/all', authMiddleware, async (req, res) => {
    await phaseController.getPhases(req, res);
});

phaseRoutes.get('/:id', authMiddleware, async (req, res) => {
    await phaseController.getPhaseById(req, res);
});

phaseRoutes.put('/update/:id', authMiddleware, async (req, res) => {
    await phaseController.updatePhase(req, res);
});

phaseRoutes.delete('/delete/:id', authMiddleware, async (req, res) => {
    await phaseController.deletePhase(req, res);
});

export { phaseRoutes };
