const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'any.required': 'Email is required',
  }),

  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

// CREATE TASK VALIDATION
const taskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    'string.min': 'Title cannot be empty',
    'string.max': 'Title cannot exceed 100 characters',
    'any.required': 'Task title is required',
  }),

  description: Joi.string()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 500 characters',
    }),

  status: Joi.string()
    .valid('todo', 'in-progress', 'done')
    .optional(),

  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .optional(),

  dueDate: Joi.date()
    .allow(null)
    .optional(),
});

// UPDATE TASK VALIDATION
const updateTaskSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 100 characters',
    }),

  description: Joi.string()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 500 characters',
    }),

  status: Joi.string()
    .valid('todo', 'in-progress', 'done')
    .optional(),

  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .optional(),

  dueDate: Joi.date()
    .allow(null)
    .optional(),
});

// GENERIC VALIDATION MIDDLEWARE
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((d) => d.message);

    return res.status(400).json({
      success: false,
      message: errors[0],
      errors,
    });
  }

  next();
};

module.exports = {
  registerSchema,
  loginSchema,
  taskSchema,
  updateTaskSchema,
  validate,
};