const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const _ = require('lodash');
const msg91 = require("msg91")("102552A7F8ZWnVs5698d323", "MTADMY", 4);

let {mongoose} = require('./db/mongoose');
let {Candidate} = require('./models/candidate');
let app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../', 'dist')));

app.post('/savecandidate', (req, res) => {
  let body = _.pick(req.body, ['name', 'mobile', 'company', 'remark']);

  let candidate = new Candidate(body);

  candidate.save()
    .then((data) => {
      res.send(data);
    }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/getcandidate', (req, res) => {
  let _id = req.header('id');

  Candidate.findOne({_id})
    .then((data) => {
      res.send(data);
    }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/sendmessage', (req, res) => {
  let body = _.pick(req.body, ['mobile', 'message']);

  /*msg91.send(body.mobile, body.message, function (err, response) {
   if (err) {
   res.status(400).send(err);
   }
   res.send({response});
   });*/

  res.send({Message: body.message});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Started up at port 3000');
});

module.exports = {app};