const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../../config/general');

const User = require('../../models/User');
const Post = require('../../models/Post');

const jwt = require('jsonwebtoken');
const Axios=require('axios');
// const fs    = require('file-system');

const bcrypt = require('bcryptjs');


//import { deleteOneMedia } from "../../globs/media/delete";
const login=require('./auth/login')
const signup=require('./auth/signup')
const Recommend=require('./Recommended-Associations')
const shortid=require('shortid')
const {createOneMedia}=require('../../globs/media/create')
module.exports = {
  login: async (req, res, next) => {
    const parseIp = (req) =>  req.connection.remoteAddress.split(":")[3];
    let adressIp = parseIp(req)
    const resp = await login(
      User,
      req.body.email, req.body.pass, adressIp ,
      bcrypt, jwt, JWT_SECRET, JWT_EXPIRES_IN, Axios, process.env.ROCKETCHAT_API
    )
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },

  signup: async (req, res, next) => {
    const resp = await signup(
      User, req.body,
      bcrypt, shortid , jwt, JWT_SECRET, JWT_EXPIRES_IN, createOneMedia, req.files, Axios, process.env.ROCKETCHAT_API, process.env.ROCKETCHAT_API_X_Auth_Token, process.env.ROCKETCHAT_API_X_User_Id
    )

    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  
  Recommend: async (req,res,next)=> {
    console.log("userrrrrr"+req.params.userId)
    const resp = await Recommend(User,Post,req.params.userId)
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);

  }

};

