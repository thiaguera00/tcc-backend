import { prisma } from '..'

export class QuestionRepository {
    // Salvar questões no banco
    async saveQuestions(questions: { question: string; difficulty_level: string }[]): Promise<void> {
        await prisma.question.createMany({
            data: questions.map(q => ({
                question: q.question,
                difficulty_level: q.difficulty_level,
            })),
        });
    }

    // Criar relação entre o usuário e a pergunta (UserQuestion)
    async createUserQuestion(userId: string, questionId: string) {
        return await prisma.userQuestion.create({
            data: {
                user_id: userId,
                question_id: questionId,
            },
        });
    }

    // Salvar as respostas do usuário
    async saveUserResponses(userResponses: {
        user_question_id: string;
        response: string;
        is_correct: boolean;
    }[]): Promise<void> {
        await prisma.userResponse.createMany({
            data: userResponses,
        });
    }

    async saveQuestion(questionData: { question: string; difficulty_level: string }): Promise<string> {
        const savedQuestion = await prisma.question.create({
            data: {
                question: questionData.question,
                difficulty_level: questionData.difficulty_level,
                created_at: new Date(),
            },
        });
        return savedQuestion.id;
    }
}
