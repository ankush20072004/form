const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const alumniRoutes = require('./routes/alumni');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/alumni', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/alumni', alumniRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
