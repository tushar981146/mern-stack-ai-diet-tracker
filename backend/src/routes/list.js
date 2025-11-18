import express from 'express';


const router = express.Router();

import { fetchLists, addTodayList } from '../controllers/listController.js';

router.get('/', fetchLists);
router.post('/add', addTodayList);

export default router;
