import express from 'express';
import { menuFilterList, getPageFilters, getKanbanPageData } from '../controllers/helperController';

const router = express.Router();

router.post('/menu-filter-list', menuFilterList);
router.post('/menu-page-filters', getPageFilters);
router.post('/kanban-page-data', getKanbanPageData);

export default router;