import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../database/repositorys/UserRepository';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { SearchRepository } from '../database/repositorys/SearchRepository';


const userRoutes = Router();
const userRepository = new UserRepository();
const searchRepository = new SearchRepository();
const userService = new UserService(userRepository, searchRepository);
const userController = new UserController(userService);

userRoutes.post('/create', async (req, res) => {
    try {
        await userController.createUser(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.get('/listUsers', async (req, res) => {
    try {
        await userController.listAllUsers(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.post('/auth/login', async (req, res) => {
    try {
        await userController.login(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.get('/me', authMiddleware, async (req, res) => {
    try {
        await userController.getProfile(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        await userController.updateData(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.post('/classificationStudent', authMiddleware, async (req, res) => {
  try {
    await userController.classificationUserStudent(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
userRoutes.delete('/inactive/:userId', authMiddleware, async (req, res) => {
  try {
    await userController.inactiveUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

export { userRoutes };
