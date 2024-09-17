const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const express = require('express');

function getNotes() {
    const notesData = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    return JSON.parse(notesData);
}

function saveNotes(notes) {
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), 'utf8');
}

// API Routes
// This get request retrieves all notes
router.get('/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
  });
  
  // This post request adds a new note
  router.post('/notes', (req, res) => {
        const notes = getNotes();
        const newNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        };
      notes.push(newNote);
        saveNotes(notes);
        res.json(newNote);
    });
  
  // This delete request removes a note by id
  router.delete('/notes/:id', (req, res) => {
        const notes = getNotes();
        const updatedNotes = notes.filter(note => note.id !== req.params.id);

        saveNotes(updatedNotes);
        res.json(updatedNotes);
  });

// Export the router
module.exports = router;