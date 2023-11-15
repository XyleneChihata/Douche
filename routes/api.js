// routes/api.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Create a new data entry
router.post('/data', async (req, res) => {
    try {
        const { content } = req.body;
        const newData = await dataController.createData(content);
        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all data entries
router.get('/data', async (req, res) => {
    try {
        const allData = await dataController.getAllData();
        res.json(allData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

