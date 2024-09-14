const express = require('express');
const path = require('path');
const fs = require('fs');

const apiRoute = require('./routes/api');
const htmlRoute = require('./routes/html');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoute);
app.use('/', htmlRoute);

const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

// API Routes
// This get request retrieves all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// This post request adds a new note
app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving note');
        }
        res.json(newNote);
    });
});

// This delete request removes a note by id
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const updatedNotes = notes.filter(note => note.id !== noteId);
    fs.writeFile('./db/db.json', JSON.stringify(updatedNotes));
    res.json(updatedNotes);
});

app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);