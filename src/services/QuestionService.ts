import { QuestionRepository } from "../database/repositorys/QuestionRepository";

export class QuestionService {
    constructor(private questionRepository: QuestionRepository) {}

    async generateQuestionsForUser(userLevel: string, numberOfQuestions: number): Promise<void> {
        const questionsToSave = [];

        for (let i = 0; i < numberOfQuestions; i++) {
            const generatedQuestion = {
                question: `Pergunta gerada para nível ${userLevel} - Questão ${i + 1}`,
                difficulty_level: userLevel,
            };
            questionsToSave.push(generatedQuestion);
        }

        await this.questionRepository.saveQuestions(questionsToSave);
    }

    async registerUserResponses(
        userId: string,
        responses: {
            questionId: string;
            response: string;
            isCorrect: boolean;
        }[]
    ): Promise<void> {
        for (const response of responses) {
            const userQuestion = await this.questionRepository.createUserQuestion(userId, response.questionId);

            await this.questionRepository.saveUserResponses([
                {
                    user_question_id: userQuestion.id,
                    response: response.response,
                    is_correct: response.isCorrect,
                },
            ]);
        }
    }

    async saveQuestion(questionData: { question: string; difficulty_level: string }): Promise<string> {
        return await this.questionRepository.saveQuestion(questionData);
    }
}