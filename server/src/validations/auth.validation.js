const Joi = require('joi');

const registerSchema = Joi.object({
    fullName: Joi.string().trim().min(2).max(50).required().messages({
        'string.empty': 'Vui lòng nhập họ tên',
        'string.min': 'Họ tên phải có ít nhất {#limit} ký tự',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email không hợp lệ',
        'string.empty': 'Vui lòng nhập email',
    }),
    password: Joi.string().min(6).max(100).required().messages({
        'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
        'string.empty': 'Vui lòng nhập mật khẩu',
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email không hợp lệ',
        'string.empty': 'Vui lòng nhập email',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Vui lòng nhập mật khẩu',
    }),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email không hợp lệ',
        'string.empty': 'Vui lòng nhập email',
    }),
});

const resetPasswordSchema = Joi.object({
    otp: Joi.string().length(6).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'Mã OTP phải có {#limit} chữ số',
        'string.pattern.base': 'Mã OTP chỉ gồm chữ số',
        'string.empty': 'Vui lòng nhập mã OTP',
    }),
    newPassword: Joi.string().min(6).max(100).required().messages({
        'string.min': 'Mật khẩu mới phải có ít nhất {#limit} ký tự',
        'string.empty': 'Vui lòng nhập mật khẩu mới',
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};
