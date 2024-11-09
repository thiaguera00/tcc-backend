import { Request, Response } from "express";
import { QuestionService } from "../services/QuestionService";

export class QuestionController {
    constructor(private questionService: QuestionService) {}

    async saveQuestion(req: Request, res: Response): Promise<Response> {
        try {
            const { question, difficulty_level } = req.body;

            if (!question || !difficulty_level) {
                return res.status(400).json({ error: 'Question and difficulty level are required' });
            }

            const questionId = await this.questionService.saveQuestion({ question, difficulty_level });
            return res.status(201).json({ id: questionId });
        } catch (error) {
            console.error('Error saving question:', error);
            return res.status(500).json({ error: 'Error saving question' });
        }
    }

    async registerUserResponses(req: Request, res: Response) {
        try {
            const userId = req.user?.userId; // A partir do middleware de autenticação
            const { responses } = req.body;

            if (!userId) {
                return res.status(400).json({ error: 'User ID not found in request' });
            }

            await this.questionService.registerUserResponses(userId, responses);
            return res.status(200).json({ message: 'User responses registered successfully' });
        } catch (error) {
            console.error('Error registering user responses:', error);
            return res.status(500).json({ error: 'Error registering user responses' });
        }
    }
}