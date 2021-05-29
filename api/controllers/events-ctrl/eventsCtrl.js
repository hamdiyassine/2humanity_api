const Event   = require('../../models/Event');
// const User          = require('../../models/User');
// const fs    = require('file-system');

const create =require( "./actions/create");
const patch =require( './actions/patch');
const deleteOne  =require( './actions/delete');
const  getAll  =require( "./actions/get-all");
const  Recommended  =require( "./actions/Recommend");
const  getByUser  =require( "./actions/get-by-user");
const  getOne  =require( "./actions/get-one");
const subscribe =require( "./actions/subscribe");
const { createOneMedia } =require( "../../globs/media/create");
const { deleteMedia } =require( "../../globs/media/delete");


// var requestIp = require('request-ip');
// var getIP = require('ipware')().get_ip;

module.exports = {
  create: async (req, res, next) =>{
    const resp = await create(Event, req.body, req.tokenData, createOneMedia, req.files)

    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  getAll: async (req, res, next) =>{
    const parseIp = (req) =>  req.connection.remoteAddress.split(":")[3];

    console.log("Adresse Ip : ",parseIp(req));

    const resp = await getAll(Event, req.tokenData, req.params.offset, req.params.limit)
    
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  },
  Recommended: async (req, res, next) =>{
    const parseIp = (req) =>  req.connection.remoteAddress.split(":")[3];


    const resp = await Recommended(Event,req.params.userId, req.params.offset)
    
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
  },
  
}