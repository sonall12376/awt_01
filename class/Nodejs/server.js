// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;


// app.use(express.static('public'));

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from backend!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve main public folder
app.use(express.static('public'));

// Serve each experiment folder
app.use('/exp6', express.static(path.join(__dirname, 'lab/Experiment_5_6')));
app.use('/exp7', express.static(path.join(__dirname, 'lab/Experiment_7')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 v7