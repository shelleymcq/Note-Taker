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

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// test page
app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')));

// shows all saved notes
app.get('/api/notes', (req, res) => res.json(db));

// read db.json for saved notes and push new note into file
app.post('/api/notes', (req, res) => {

    let notesDb = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    const newNote = {
        id: nid(),
        title: req.body.title,  
        text: req.body.text
    }

    notesDb.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesDb));

    console.log(newNote, "New note added successfuly");

    res.json(newNote);
});


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})