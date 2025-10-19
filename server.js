const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Budget = require('./models/budget');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static('public'));

mongoose.connect('mongodb://localhost:27017/mongodb_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/budget', async (req, res) => {
  try {
    const budgetData = await Budget.find({});
    res.json({ myBudget: budgetData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budget data' });
  }
});

app.post('/budget', async (req, res) => {
  try {
    const { title, budget, color } = req.body;

    const newEntry = new Budget({ title, budget, color });
    await newEntry.save();

    res.status(201).json({ message: 'Budget entry added successfully', entry: newEntry });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
