// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
// creates unique 6-character id
const nid = require('nid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// array of notes
let notesDb = [];

// ROUTES

// '/' works, '*' blocks the notes res, but not the test res????
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// test page
app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')));

// shows all saved notes
app.get('/api/notes', (req, res) => res.json(notesDb));

// create new note and push it to notesDb array
app.post('/api/notes', (req, res) => {
    const newNote = {
        id: nid(),
        title: req.body.title,  
        text: req.body.text
    }

    console.log(newNote);

    notesDb.push(newNote);
    
    res.json(newNote);
});


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})