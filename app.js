//===========> pm2 start npm -- run start
//===========> pm2 start 'npm start' --name app


import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
var sentiment = require('multilang-sentiment');
// var Sentiment = require('sentiment');
// var sentiment = new Sentiment();
import dotenv from "dotenv";
import User, { collection } from "./api/models/User";
import e from "express";
import Post from "./api/models/Post";
import Comment from "./api/models/Comment";
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
    
      //console.log(process.env.DB)
      console.log('Database is connected')
     
    //portail ***rating based on comments***
    const rating = (userId) => {
      let comments = []
      User.findById(userId).then(user => Post.find({postedBy: user._id})
      .then(filteredPosts => filteredPosts.map(filteredPost => filteredPost._id))
        .then(filteredPostsIds => 
          filteredPostsIds.map(filteredPostId => Comment.find({post : filteredPostId })
          .then(relatedComments => relatedComments.map(relatedComment => relatedComment.comments.map(comment => comment.message)))
          .then(data => data.map(el => el.map(msg => comments.push(msg))
            )).then(() => comments.reduce(
              (total, rec) => total + sentiment(rec, 'fr').score , 0
            )).then(rate => User.findByIdAndUpdate(userId, {rating : rate}))
          )
        )
      )
    }

    User.find().then(users => users.map(
      user => rating(user._id)
    ))
    

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
app.use('/posts', require('./api/routes/posts-routes'));
//app.use('/events', require('./api/routes/events-routes'));
app.use('/comments',require('./api/routes/comments-routes'));

app.get('/', (req, res, next) => {
  console.log('OPEN ROOT !');
  res.status(200).json({ msg: ' API DEV', port: process.env.PORT || 5000 });
})

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.info('Listening on port ' + port);
});
