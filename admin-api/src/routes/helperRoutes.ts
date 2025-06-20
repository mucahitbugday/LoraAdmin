import express from 'express';
import { getGlobalPageList } from '../controllers/helperController';

const router = express.Router();

router.post('/page-data', getGlobalPageList);

export default router;