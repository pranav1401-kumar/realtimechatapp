const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Message = require('../models/message');
const router = express.Router();

// Send a new message
router.post('/', authMiddleware, async (req, res) => {
  const { senderId, receiverId, groupId, content } = req.body;
  try {
    const message = new Message({ senderId, receiverId, groupId, content });
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get message history
router.get('/history', authMiddleware, async (req, res) => {
  const { userId, withUserId, groupId, page = 1, pageSize = 10 } = req.query;
  try {
    const query = groupId
      ? { groupId }
      : { $or: [{ senderId: userId, receiverId: withUserId }, { senderId: withUserId, receiverId: userId }] };
    const messages = await Message.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
