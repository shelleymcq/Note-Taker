// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes

app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')));

// '/' works, '*' blocks the notes res, but not the test res????
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// reads the db.json file containing saved notes
app.get('/api/notes', (req, res) => res.json(db));

// create new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    // Using a RegEx Pattern to remove spaces from newNote title
    newNote.title = newNote.title.replace(/\s+/g, '').toLowerCase();
    console.log(newNote);
    db.push(newNote);
    res.json(newNote);
})



// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})