const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const users = require('./routes/users');
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/api/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log('Server started at port ' + port);
})
