import { Router } from 'express';
import { QuestionController } from '../controllers/QuestionController';
import { QuestionService } from '../services/QuestionService';
import { QuestionRepository } from '../database/repositorys/QuestionRepository';
import { authMiddleware } from '../middlewares/AuthMiddleware';


const questionRoutes = Router();
const questionRepository = new QuestionRepository();
const questionService = new QuestionService(questionRepository);
const questionController = new QuestionController(questionService);

questionRoutes.post('/responses', authMiddleware, async (req, res) => {
    await questionController.registerUserResponses(req, res);
});

questionRoutes.post('/save-question', async (req, res) => {
    await questionController.saveQuestion(req, res);
});

export { questionRoutes };
