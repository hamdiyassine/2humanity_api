//===========> pm2 start npm -- run start
//===========> pm2 start 'npm start' --name app


import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();


mongoose.Promise = global.Promise;
console.log('process.env.MONGO_DB', process.env.MONGO_DB);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  family: 4,// Use IPv4, skip trying IPv6
  auto_reconnect: true 
};
// mongoose.connect(process.env.MONGO_DB, options)
//   .then(
//     () => { console.log('Database is connected') },
//     err => { console.log('Can not connect to the database ' + JSON.stringify(err)) }
//   );

  var connectWithRetry = function() {
    return mongoose.connect(process.env.MONGO_DB, options, function(err) {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      }
      console.log('Database is connected')
    });
  };
  connectWithRetry();
const app = express();

app.use('/uploads', express.static('uploads'));

// app.use('/uploads/media', express.static('uploads/media'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const fileUpload = require('express-fileupload');
app.use(fileUpload(
  //{limits: { fileSize: 50 * 1024 * 1024 },}
));

app.use('/users', require('./api/routes/users-routes'));
app.use('/medias', require('./api/routes/media-routes'));


app.get('/', (req, res, next) => {
  console.log('OPEN ROOT !');
  res.status(200).json({ msg: ' API DEV', port: process.env.PORT || 5000 });
})

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.info('Listening on port ' + port);
});
