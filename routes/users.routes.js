const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const {
  signupForm,
  signup,
  uploadImage,
  userProfile,
  userList,
  followUser,
  unFollowUser,
  emailLinkVerification,
  initResetPassword,
  resetPasswordForm,
  resetPassword
} = require('../controllers/users.controller');

router.get('/', userList);
router.get('/follow/:userId', followUser);
router.get('/unfollow/:userId', unFollowUser);
router.get('/:username', userProfile);
router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image',ensureAuthenticated, uploadImage);
router.get('/email-verification/:userId/:token', emailLinkVerification);
router.post('/forgot-password', initResetPassword);
router.get('/reset-password/:userId/:token', resetPasswordForm);
router.post('/reset-password/:userId/:token', resetPassword);

module.exports = router;
