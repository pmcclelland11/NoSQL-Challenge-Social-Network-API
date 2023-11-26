const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
const reactionRoutes = require('./api/reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);

router.use((req, res) => res.status(404).send('Not Found'));

module.exports = router;