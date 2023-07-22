import { Router } from "express";
import usuario from './usuario.routes';
import treino from './treino.routes';

const router = Router();

router.use('/usuario', usuario);
router.use('/treino', treino);

export default router;