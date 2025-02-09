const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle guestbook submissions
app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  // Save to JSON file (for demonstration; replace with a database in production)
  const entry = { name, message, date: new Date() };
  
  fs.readFile('guestbook.json', (err, data) => {
    const guestbook = JSON.parse(data || '[]');
    guestbook.push(entry);
    
    fs.writeFile('guestbook.json', JSON.stringify(guestbook, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving entry.' });
      }
      res.status(201).json({ message: 'Entry added successfully!' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
