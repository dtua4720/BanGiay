const rateLimit = require('express-rate-limit');

/**
 * Limits login attempts to slow down brute-force / credential-stuffing attacks.
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        code: 429,
        message: 'Quá nhiều yêu cầu đăng nhập, vui lòng thử lại sau 15 phút.',
    },
});

/**
 * Limits forgot-password / reset-password requests to prevent OTP spam
 * and brute-forcing of the 6-digit OTP code.
 */
const otpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        code: 429,
        message: 'Bạn đã yêu cầu quá nhiều lần, vui lòng thử lại sau.',
    },
});

module.exports = { authLimiter, otpLimiter };
