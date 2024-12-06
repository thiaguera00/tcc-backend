import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../database/repositorys/UserRepository';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { SearchRepository } from '../database/repositorys/SearchRepository';
import { PasswordResetRepository } from '../database/repositorys/PasswordResetRepository';
import { ConquestRepository } from '../database/repositorys/ConquestRepository';
import { UserConquestRepository } from '../database/repositorys/UserConquestRepository';

const userRoutes = Router();
const userRepository = new UserRepository();
const searchRepository = new SearchRepository();
const recoveryRepository = new PasswordResetRepository();
const conquestRepository = new ConquestRepository();
const userConquestRepository = new UserConquestRepository();
const userService = new UserService(userRepository, searchRepository, recoveryRepository, userConquestRepository, conquestRepository);
const userController = new UserController(userService);

userRoutes.post('/create', async (req, res) => {
    try {
        await userController.createUser(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.post('/create-admin', async (req, res) => {
    try {
        await userController.createUserAdmin(req, res);
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
userRoutes.get('/active-users', async (req, res) => {
    try {
        await userController.countUsersActive(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.get('/search-users', async (req, res) => {
    try {
        await userController.listAllResponseSearches(req, res);
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

userRoutes.post('/user-conquest/:userId', authMiddleware, async (req, res) => {
    try {
        await userController.assignUserConquest(req, res);
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

userRoutes.post('/recovery-password', async(req, res) => {
    try {
        await userController.recoverPassword(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
userRoutes.post('/reset-password', async(req, res) => {
    try {
        await userController.resetPassword(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export { userRoutes };
