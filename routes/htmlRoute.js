const router = require('express').Router();
const path = require('path');
const express = require('express');

// HTML Routes
// This get request retrieves the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// This get request retrieves the index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Default to home page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export the router so it can be used in server.js
module.exports = router;
