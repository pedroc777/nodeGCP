import {Router} from 'express';
/**
 * cada punto es un nivel de db
 */

import { ping } from '../controllers/index.controllers.js';


const router = Router();


router.get('/ping',ping);

export default router;