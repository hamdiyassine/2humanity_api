const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
import e from "express";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
//import User, { collection } from "../../../models/User";
var sentiment = require('multilang-sentiment');
// var Sentiment = require('sentiment');
// var sentiment = new Sentiment();

/** 
 * Find all Users
 */
exports.findAll = (req, res) => {
    User.find()
      .sort({ name: -1 })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };
  exports.findAllByPoints = (req, res) => {
    User.find()
      .sort({ points: -1 }).limit(8)

      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };
  /**
 * Find one User
 */
exports.findOne = (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.id,
          });
        }
        res.status(200).send(user);
        console.log(user);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      });
  };
 


  /**
 * Delete a user with the specified id in the request
 */
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found ",
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete user ",
        });
      });
  };

  /**
 * Update a user with the specified id in the request
 */
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};


//portail ***rating based on comments***
exports.rating = (userId) => {
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