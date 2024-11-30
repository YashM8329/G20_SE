const User = require('../models/User');
const Publisher = require('../models/Publisher');
const { generateToken } = require('../utils/jwt');
const { emailValidator } = require('../utils/validators');
const AppError = require('../utils/AppError');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }

        if (!emailValidator(email)) {
            throw new AppError('Invalid email format', 400);
        }

        //const user = await User.findOne({ email }) || await Publisher.findOne({ email });
        const user = await User.findOne({ email }).select('+password') || await Publisher.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            throw new AppError('Invalid credentials', 401);
        }

        const token = generateToken({
            userId: user._id,
            role: user instanceof Publisher ? 'publisher' : 'user'
        });

        // Set HTTP-only cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({
            status: 'success',
            user: {
                id: user._id,
                email: user.email,
                role: user instanceof Publisher ? 'publisher' : 'user',
                name: user instanceof Publisher ? user.publisherName : user.name,
                token: token
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        // Clear the auth token cookie
        res.cookie('auth_token', 'logged_out', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000) // Cookie expires in 1 second
        });

        res.status(200).json({
            status: 'success',
            message: 'Successfully logged out'
        });
    } catch (error) {
        next(error);
    }
};

// Optional: Add refresh token functionality
exports.refreshToken = async (req, res, next) => {
    try {
        const currentUser = req.user; // This would come from your auth middleware

        if (!currentUser) {
            throw new AppError('Please log in to get a new token', 401);
        }

        const newToken = generateToken({
            userId: currentUser._id,
            role: currentUser instanceof Publisher ? 'publisher' : 'user'
        });

        res.cookie('auth_token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.status(200).json({
            status: 'success',
            message: 'Token refreshed successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Optional: Add password reset functionality
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new AppError('Please provide your email address', 400);
        }

        const user = await User.findOne({ email }) || await Publisher.findOne({ email });

        if (!user) {
            throw new AppError('No account found with that email address', 404);
        }

        // Generate password reset token (you'll need to implement this in your User/Publisher model)
        const resetToken = await user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // Here you would typically send an email with the reset token
        // For development, we'll just send it in the response
        res.status(200).json({
            status: 'success',
            message: 'Password reset token generated',
            resetToken // In production, remove this and send via email instead
        });
    } catch (error) {
        next(error);
    }
};

exports.googleAuthCallback = async (req, res, next) => {
    try {
      const googleUser = req.user; 
  
      const existingUser = await User.findOne({ email: googleUser.email });
  
      if (existingUser) {
        if (!existingUser.isGoogleUser) {
          existingUser.googleId = googleUser.id;
          existingUser.isGoogleUser = true;
          existingUser.photo = googleUser.photos[0]?.value || null;
          await existingUser.save();
  
          const token = generateToken({
            userId: existingUser._id,
            role: 'user' // assuming 'user' is the role; change if necessary
          });
  
          res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
          });
  
          return res.redirect('/profile');
        } else {
          // If the user is already a Google user, just log them in
          // Generate and send a JWT token or do whatever authentication you use
          const token = generateToken({
            userId: existingUser._id,
            role: 'user'
          });
          res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
          });
  
          return res.redirect('/profile'); 
        }
      } else {
        // If no existing user, redirect to registration page or show an error
        return res.status(404).json({
          status: 'fail',
          message: 'No user found with this email. Please register first.'
        });
      }
    } catch (error) {
      next(error);
    }
  };
  