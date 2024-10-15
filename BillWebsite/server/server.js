// Importing Express
const express = require('express');
const app = express();

// Defining a port
const PORT = 3000;

// Defining a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
