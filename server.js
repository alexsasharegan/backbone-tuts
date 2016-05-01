var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dev'));

var docs = {
  1: {
    text: 'this is a document',
    id: 1
  }
};

var notes = {
  1: {
    1: {
      text: 'this is a note',
      id: 1
    },
    2: {
      text: 'this is another note',
      id: 2
    }
  }
};
var d = 2, // doc id
    n = 2; // note id

app.get('/documents', function (req, res) {
  let results = [];
  for (var doc in docs) {
    if (docs.hasOwnProperty(doc)) {
      results.push(docs[doc]);
    }
  }
  res.json(results);
});

app.post('/documents', function (req, res) {
  var doc = req.body;
  doc.id = d++;
  docs[doc.id] = doc;
  res.json(doc);
});

app.put('/documents/:id', function (req, res) {
  docs[req.params.id] = req.body;
  res.json(req.body);
});

app.get('/documents/:did/notes', function (req, res) {
  let results = [];
  let n = notes[req.params.did];
  for (var note in n) {
    if (n.hasOwnProperty(note)) {
      results.push(n[note]);
    }
  }
  res.json(results);
});

app.post('/documents/:did/notes', function (req, res) {
  let note = req.body;
  let id = req.params.did;
  note.id = n++;
  if (!notes[id]) {
    notes[id] = {};
  }
  notes[id][note.id] = note;
  res.json(note);
});

app.put('/documents/:did/notes/:nid', function (req, res) {
  notes[req.params.did][req.params.nid] = req.body;
  res.json(req.body);
});

app.listen(PORT);
