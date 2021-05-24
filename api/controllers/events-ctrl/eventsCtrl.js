const Event   = require('../../models/Event');
// const User          = require('../../models/User');
// const fs    = require('file-system');

import create from "./actions/create";
import patch from './actions/patch';
import { deleteOne } from './actions/delete';
import { getAll } from "./actions/get-all";
import { getByUser } from "./actions/get-by-user";
import { getOne } from "./actions/get-one";
import subscribe from "./actions/subscribe";
import { createOneMedia } from "../../globs/media/create";
import { deleteMedia } from "../../globs/media/delete";

module.exports = {
  create: async (req, res, next) =>{
    const resp = await create(Event, req.body, req.tokenData, createOneMedia, req.files)

    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  getAll: async (req, res, next) =>{
    const resp = await getAll(Event, req.tokenData, req.params.offset, req.params.limit)
    
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  getByUser: async (req, res, next) =>{
    const resp = await getByUser(Event, req.tokenData, req.params.userId, req.params.offset, req.params.limit)
    
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  getOne: async (req, res, next) =>{
    const resp = await getOne(Event, req.tokenData, req.params.eventId)
    
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  patch: async (req, res, next) =>{
    const resp = await patch(Event, req.tokenData, req.body, req.params.eventId, req.files, createOneMedia, deleteMedia)

    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  subscribe: async (req, res, next) =>{
    const resp = await subscribe(Event, req.params.eventId, req.body, req.tokenData)

    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  deleteOne: async (req, res, next) =>{
    const resp = await deleteOne(Event, req.tokenData, req.params.eventId, deleteMedia)
    
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  }
}