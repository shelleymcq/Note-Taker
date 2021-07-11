// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require("./db/db.json")
// creates unique 6-character id
const nid = require('nid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// ROUTES

// '/' works, '*' blocks the notes res, but not the test res????
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// sends the user to the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// test page
app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')));

// shows all saved notes
app.get('/api/notes', (req, res) => res.json(db));

// posts the note to the application
app.post('/api/notes', (req, res) => {

    // assigns unique id to note
    const note = req.body;

    note.id = nid();

    db.push(note);

    console.log(note, "New note added successfuly");

    res.json(true);
});


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})