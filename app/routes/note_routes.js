module.exports = function (app, db) {
  const ObjectID = require('mongodb').ObjectID;
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send('Delete ' + id + ' from collection');
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = { text: req.body.body, title: req.body.title };
    const details = { _id: new ObjectID(id) };
    db.collection('notes').update(details, note, (err, item) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send('Update ' + id + ' from collection');
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
