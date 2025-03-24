const app = require('./app');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 1000;

app.use('/uploads', express.static('public/uploads'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

