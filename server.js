// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');


const app = express();


// Routes

app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')));

// '/' works, '*' blocks the notes res, but not the test res????
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/db', (req, res) => res.json(db));



const PORT = process.env.PORT || 4000;

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})