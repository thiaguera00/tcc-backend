import { Request, Response } from "express";
import { ICreateUserDTO, IUpdateUser } from "../models/dtos/UserDto";
import { UserService } from "../services/UserService";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserController {
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response) {
        try {
            const userData: ICreateUserDTO = req.body;
            const newUser = await this.userService.create(userData);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating user' });
        }
    }
    

    async listAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.listAll();

            const formattedUsers = JSON.stringify(users, null, 2);
            return res.status(200).send(formattedUsers);
        } catch (error) {
            console.error('Error retrieving users:', error);
            return res.status(500).json({ error: 'Error retrieving users' });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT_SECRET not found in environment variables');
            }

            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
            return res.status(200).json({ token });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Error during login' });
        }
    }

    async getProfile(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID not found in request' });
            }

            const user = await this.userService.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error retrieving user profile:', error);
            return res.status(500).json({ error: 'Error retrieving user profile' });
        }
    }

    async updateData(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData: IUpdateUser = req.body;

            const updatedUser = await this.userService.updateUser(id, updateData);

            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error updating user data:', error);
            return res.status(500).json('Error updating user data' );
        }
    }

    async classificationUserStudent(req: Request, res: Response) {
        try {
            const userId = req.user?.userId;
            const { responses } = req.body;
    
            if (!userId) {
                return res.status(400).json({ error: 'User ID not found in request' });
            }
    
            if (!Array.isArray(responses) || responses.length < 3) {
                return res.status(400).json({ error: 'Invalid input: Responses must be an array of at least three elements.' });
            }
    
            const user = await this.userService.classificationStudent(responses, userId);
    
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error classifying user level:', error);
            return res.status(500).json({ error: 'Error classifying user level' });
        }
    }

    async assignUserConquest(req: Request, res: Response): Promise<Response> {
        try {
          const { userId } = req.params;
          const { conquestName } = req.body;
    
          if (!userId || !conquestName) {
            return res.status(400).json({ error: 'User ID e Conquest Name são obrigatórios' });
          }
    
          const userConquest = await this.userService.assignConquest(userId, conquestName);
          return res.status(200).json(userConquest);
        } catch (error) {
          console.error('Erro ao atribuir conquista ao usuário:', error);
          return res.status(500).json({ error: 'Erro ao atribuir conquista ao usuário' });
        }
      }

    async inactiveUser(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            const user = await this.userService.inactive(userId);
            return res.status(204).json(user);
        } catch (error) {
            console.error('Error inaticve user:', error);
            return res.status(500).json({ error: 'Error inactive user' });
        }
    }

    async recoverPassword(req: Request, res: Response) {
        try {
            const {email} = req.body;

            const user = await this.userService.recoverPasswordUser(email);
            return res.status(200).json(user)
        } catch(error) {
            console.error('Error inaticve user:', error);
            return res.status(404).json({ error: 'Email not found' });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { token, newPassword } = req.body;

            if (!token || !newPassword) {
                return res.status(400).json({ error: "Token e nova senha são obrigatórios" });
            }

            const response = await this.userService.resetPassword(token, newPassword);

            return res.status(200).json(response);
        } catch (error: any) {
            console.error("Erro ao redefinir senha:", error.message);

            if (error.message === "Token inválido ou expirado") {
                return res.status(400).json({ error: "Token inválido ou expirado" });
            } else if (error.message === "Usuário não encontrado") {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

}

