const Task = require('../models/task.model');

// GET /api/tasks
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sort = '-createdAt' } = req.query;

    const filter = {
      user: req.user._id,
    };

    // Status filter
    if (status && ['todo', 'in-progress', 'done'].includes(status)) {
      filter.status = status;
    }

    // Priority filter
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      filter.priority = priority;
    }

    // Search filter
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    const tasks = await Task.find(filter)
      .sort(sort)
      .lean();

    // Stats
    const total = await Task.countDocuments({
      user: req.user._id,
    });

    const completed = await Task.countDocuments({
      user: req.user._id,
      status: 'done',
    });

    const pending = await Task.countDocuments({
      user: req.user._id,
      status: { $ne: 'done' },
    });

    res.json({
      success: true,
      count: tasks.length,

      stats: {
        total,
        completed,
        pending,
      },

      tasks,
    });

  } catch (error) {
    next(error);
  }
};

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      status,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Task created!',
      task,
    });

  } catch (error) {
    next(error);
  }
};

// PATCH /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (status !== undefined) {
      task.status = status;
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }

    await task.save();

    res.json({
      success: true,
      message: 'Task updated!',
      task,
    });

  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    res.json({
      success: true,
      message: 'Task deleted.',
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};