import { Router } from 'express';

const router = Router();

// GET /api/properties - list all properties (filter by category, area, price)
router.get('/', (req, res) => {
  res.json({ message: 'List properties - to implement' });
});

// GET /api/properties/:id - single property detail
router.get('/:id', (req, res) => {
  res.json({ message: `Property detail for ${req.params.id} - to implement` });
});

export default router;