const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate, taskSchema, updateTaskSchema } = require('../middleware/validation.middleware');

router.use(protect); // All task routes are protected

router.route('/')
  .get(getTasks)
  .post(validate(taskSchema), createTask);

router.route('/:id')
  .patch(validate(updateTaskSchema), updateTask)
  .delete(deleteTask);

module.exports = router;
