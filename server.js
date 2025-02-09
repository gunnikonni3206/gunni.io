const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the absolute path to your chat file
const chatFilePath = 'C:\\Users\\Gunnar\\Desktop\\sites\\gunni.io\\chat.txt';

// Endpoint to handle new chat messages
app.post('/append', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send('No message provided');
  }
  
  // Append the message along with a newline
  fs.appendFile(chatFilePath, message + '\n', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
      return res.status(500).send('Error appending file');
    }
    res.send('Message appended!');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
