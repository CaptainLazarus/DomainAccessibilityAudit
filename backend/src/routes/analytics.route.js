import express from 'express';

import controller from '../controllers/analytics.controller';

const router = express.Router();

router.get('/:domain', controller.get_analytics_url);
router.get('/', controller.get_analytics);

module.exports = router;
