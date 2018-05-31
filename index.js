const mongoose = require('mongoose');
const csv = require('fast-csv');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const fs = require('fs');
const stream = fs.createReadStream(process.env.CSVFILEPATH);

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Member Model
const Member = require('./models/member');

const utils = require('./utils');

const addMember = (data) => {
  const member = new Member(data);
  member.save((err) => {
    if (err) console.log(err);
  });
};

csv.fromStream(stream, { headers: true })
  .on('data', (data) => {
    if (data['email'] !== '') {
      data['type'] = utils.convertType(data['type']);
      data['account'] = data['email'];
      // Default password
      data['password'] = 'x';
      // console.log(data);
      addMember(data);
    }
  })
  .on('end', () => {
    console.log('---');
  });
