import { Router } from 'express';

import user from '../routes/User';
import vehicle from '../routes/Vehicle';

const router = Router();
user(router);
vehicle(router);

export default router;