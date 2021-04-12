const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../../config/general');

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
import Axios from "axios"
// const fs    = require('file-system');

const bcrypt = require('bcryptjs');

import login from "./auth/login";
import signup from "./auth/signup";

import shortid from 'shortid'
import { createOneMedia } from "../../globs/media/create";
//import { deleteOneMedia } from "../../globs/media/delete";

module.exports = {
  login: async (req, res, next) => {
    const resp = await login(
      User,
      req.body.email, req.body.pass,
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

};

