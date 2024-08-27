const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Group = require('../models/group');
const router = express.Router();

// Create a new group
router.post('/', authMiddleware, async (req, res) => {
  const { name, members } = req.body;
  try {
    const group = new Group({ name, members });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Send a message to a group
router.post('/:groupId/messages', authMiddleware, async (req, res) => {
  const { groupId } = req.params;
  const { senderId, content } = req.body;
  try {
    const message = new Message({ senderId, groupId, content });
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
