const express = require('express');
const {User, Thought} = require('../../models');

const router = express.Router();

router.get('/', async (req,res) => {
    const thoughts = await Thought.find({});
    res.json(thoughts);
});

router.get('/:id', async () => {
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
});

router.post('/', async () => {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thougts: newThought._id }},
        { new: true }
    );
    res.json(newThought);
});

router.put('/:id', async (req, res) => {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedThought);
});
  
router.delete('/:id', async (req, res) => {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    res.json(deletedThought);
});

router.post('/:thoughtId/reactions', async (req, res) => {
const updatedThought = await Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $push: { reactions: req.body } },
    { new: true }
    );
    res.json(updatedThought);
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
const updatedThought = await Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { new: true }
    );
    res.json(updatedThought);
});
  
module.exports = router;