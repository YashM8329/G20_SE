const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const passport = require('passport');

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);

// Google authentication routes
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleAuthCallback // New controller to handle Google callback response
);

// Protected routes
router.use(protect);
router.post('/refresh-token', authController.refreshToken);

// User profile route (requires authentication)
router.get('/profile', protect, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    photo: req.user.photo, // Include Google profile photo in the response
  });
});

module.exports = router;