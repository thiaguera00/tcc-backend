import { Router } from "express";
import { ProgressPhaseController } from "../controllers/ProgressPhaseController";
import { ProgressPhaseService } from "../services/ProgressPhaseService";
import { ProgressPhaseRepository } from "../database/repositorys/ProgressPhaseRepository";
import { UserRepository } from "../database/repositorys/UserRepository";
import { PhaseRepository } from "../database/repositorys/PhaseRepository";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const progressPhaseRepository = new ProgressPhaseRepository();
const userRepository = new UserRepository();
const phaseRepository = new PhaseRepository();
const progressPhaseService = new ProgressPhaseService(progressPhaseRepository, userRepository, phaseRepository);
const progressPhaseController = new ProgressPhaseController(progressPhaseService);

const progressRouter = Router();

progressRouter.post('/create', authMiddleware, async (req, res) => {
    try {
        await progressPhaseController.createProgressPhase(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

progressRouter.get('/user/:userId', authMiddleware, async (req, res) => {
    try {
        await progressPhaseController.getProgressByUserId(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

progressRouter.put('/update/:progressPhaseId', authMiddleware, async (req, res) => {
    try {
        await progressPhaseController.updateProgress(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

progressRouter.get('/find/:userId/:phaseId', authMiddleware, async (req, res) => {
    try {
        await progressPhaseController.findProgress(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default progressRouter;
